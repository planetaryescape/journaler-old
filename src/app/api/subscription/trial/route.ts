import { db } from "@/db";
import { users } from "@/db/schema";
import { createDefaultApiRouteContext } from "@/lib/createDefaultApiRouteContext";
import { logger } from "@/lib/logger";
import { stripe } from "@/lib/stripe";
import { getAuth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const subscribeInputSchema = z.object({
  priceId: z.string(),
  userId: z.string(),
  trialDays: z.coerce.number(),
});

export type SubscribeInput = z.infer<typeof subscribeInputSchema>;

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);

  const context = {
    ...createDefaultApiRouteContext(request),
    userId,
  };

  try {
    if (!userId) {
      logger.error(context, "Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const data = subscribeInputSchema.parse(body);

    if (userId !== data.userId) {
      logger.error(context, "Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user = await db
      .select({
        stripeCustomerId: users.stripeCustomerId,
        email: users.email,
      })
      .from(users)
      .where(eq(users.clerkUserId, userId))
      .limit(1);

    if (!user[0]) {
      logger.error(context, "User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user[0].stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user[0].email ?? "",
      });

      user = await db
        .update(users)
        .set({
          stripeCustomerId: customer?.id,
        })
        .where(eq(users.clerkUserId, userId));
    }

    const lineItems = [
      {
        price: data.priceId,
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      customer: user[0].stripeCustomerId ?? "",
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: new URL(request.nextUrl).origin + "/payment/success",
      cancel_url: new URL(request.nextUrl).origin + "/payment/cancelled",
      subscription_data: {
        trial_period_days: data.trialDays,
        trial_settings: {
          end_behavior: {
            missing_payment_method: "cancel",
          },
        },
      },
      payment_method_collection: "if_required",
      allow_promotion_codes: true,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    logger.error(
      {
        ...context,
        error,
      },
      "Follow error"
    );
  }
}
