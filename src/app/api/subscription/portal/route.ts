import { db } from "@/db";
import { users } from "@/db/schema";
import { createDefaultApiRouteContext } from "@/lib/createDefaultApiRouteContext";
import { logger } from "@/lib/logger";
import { stripe } from "@/lib/stripe";
import { getAuth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const getPortalInputSchema = z.object({
  userId: z.string(),
});

export type GetPortalInput = z.infer<typeof getPortalInputSchema>;

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

    const data = getPortalInputSchema.parse(body);

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

    const session = await stripe.billingPortal.sessions.create({
      customer: user[0].stripeCustomerId ?? "",
      return_url: new URL(request.nextUrl).origin + "/dashboard/subscription",
    });

    return NextResponse.json({ sessionUrl: session.url });
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
