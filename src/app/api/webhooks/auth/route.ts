import { db } from "@/db";
import { NewUser, users } from "@/db/schema";
import WelcomeEmail from "@/emails/welcome";
import { createDefaultApiRouteContext } from "@/lib/createDefaultApiRouteContext";
import { logger } from "@/lib/logger";
import { resend } from "@/lib/resend";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

import { formatErrorEntity } from "@/lib/utils/formatEntity";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

const newUserSchema = createInsertSchema(users);

export async function POST(request: Request) {
  const data = await request.json();

  const context = {
    ...createDefaultApiRouteContext(request),
  };

  logger.info({ ...context, eventType: data.type }, "Webhook received");
  // const headers = nextHeaders() as Record<string, string>;
  // const secret = "whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw";

  // const wh = new Webhook(secret);
  // const msg = wh.verify(payload, headers);

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
        react: WelcomeEmail(),
      });
      return NextResponse.json(null, { status: 200 });
    } catch (e) {
      logger.error({ ...context, error: e }, "Failed to create new user");
      return NextResponse.json(formatErrorEntity("Failed to create new user"), {
        status: 500,
      });
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

      return NextResponse.json(null, { status: 204 });
    } catch (e) {
      logger.error({ ...context, error: e }, "Failed to update user");
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 },
      );
    }
  }

  if (data.type === "user.deleted") {
    try {
      const result = await db
        .delete(users)
        .where(eq(users.clerkUserId, data.data.id));

      logger.info({ ...context, result }, "User deleted");

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      logger.error(
        { ...context, error, errorMessage: (error as Error).message },
        "Failed to delete user",
      );
      return NextResponse.json(
        { error: "Failed to delete user" },
        { status: 500 },
      );
    }
  }
}
