import DealbaseWelcomeEmail from "@/emails/welcome";
import { createDefaultApiRouteContext } from "@/lib/createDefaultApiRouteContext";
import { db } from "@/lib/db";
import { NewUser, users } from "@/lib/db/schema";
import { logger } from "@/lib/logger";
import { resend } from "@/lib/resend";
import { stripe } from "@/lib/stripe";
import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

const newUserSchema = createInsertSchema(users);

export async function POST(request: Request) {
  const data = await request.json();

  const scope = Sentry.getCurrentHub().getScope();
  const transaction = Sentry.startTransaction({
    name: `User Webhook`,
  });
  scope?.setSpan(transaction);

  const context = {
    ...createDefaultApiRouteContext(request),
  };

  logger.info({ ...context, eventType: data.type }, "Webhook received");

  if (data.type === "user.created") {
    try {
      const customer = await stripe.customers.create({
        email: data.data.email_addresses[0].email_address,
      });

      const newUser = newUserSchema.parse({
        username: data.data.email_addresses[0].email_address,
        email: data.data.email_addresses[0].email_address,
        firstname: data.data.first_name,
        lastname: data.data.last_name,
        clerkUserId: data.data.id,
        role: "user",
        stripeCustomerId: customer?.id,
      } satisfies NewUser);

      const user = await db.insert(users).values(newUser);

      logger.info({ ...context, data, user, customer }, "User created");

      await resend.emails.send({
        from: "dealbase.africa Team <welcome@communication.dealbase.africa>",
        to: data.data.email_addresses[0].email_address,
        subject: "Welcome to dealbase.africa",
        react: DealbaseWelcomeEmail(),
      });
      return NextResponse.json({}, { status: 200 });
    } catch (e) {
      logger.error({ ...context, error: e }, "Failed to create new user");
      return NextResponse.json(
        { error: "Failed to create new user" },
        { status: 500 }
      );
    }
  }

  if (data.type === "user.updated") {
    try {
      await db
        .update(users)
        .set({
          email: data.data.email_addresses[0].email_address,
          firstname: data.data.first_name,
          lastname: data.data.last_name,
          clerkUserId: data.data.id,
          role: "user",
        })
        .where(eq(users.clerkUserId, data.data.id));
      logger.info({ ...context, data: data.data }, "User updated");

      await resend.emails.send({
        from: "dealbase.africa Team <support@communication.dealbase.africa>",
        to: data.data.email_addresses[0].email_address,
        subject: "dealbase.africa | User updated",
        html: `
          <h1>User Updated</h1>
          <p>User details update for  ${
            data.data.first_name + " " + data.data.last_name
          } </p>
        `,
        // react: DealbaseWelcomeEmail(),
      });

      return NextResponse.json({}, { status: 204 });
    } catch (e) {
      logger.error({ ...context, error: e }, "Failed to update user");
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 }
      );
    }
  }

  if (data.type === "user.deleted") {
    try {
      await db.delete(users).where(eq(users.clerkUserId, data.data.id));

      logger.info({ ...context, data: data.data }, "User deleted");

      return NextResponse.json({}, { status: 204 });
    } catch (e) {
      logger.error({ ...context, error: e }, "Failed to delete user");
      return NextResponse.json(
        { error: "Failed to delete user" },
        { status: 500 }
      );
    }
  }
}
