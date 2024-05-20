import { relations } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { followers } from "./followers";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: varchar("username").notNull().unique(),
    firstname: varchar("firstname"),
    lastname: varchar("lastname"),
    role: roleEnum("role").notNull().default("user"),
    stripeCustomerId: varchar("stripe_customer_id"),
    stripeSubscriptionId: varchar("stripe_subscription_id"),
    stripeSubscriptionInterval: varchar("stripe_subscription_interval"),
    stripePriceId: varchar("stripe_price_id"),
    stripePlanId: varchar("stripe_plan_id"),
    trialUsed: boolean("trial_used").default(false),
    isDeleted: boolean("is_deleted").default(false),
    clerkUserId: varchar("clerk_user_id"),
    email: varchar("email", {}).notNull().unique(),
    createdAt: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at", {})
      .$default(() => new Date())
      .notNull(),
  },
  (users) => ({
    usernameIndex: uniqueIndex("username_idx").on(users.username),
    emailIndex: uniqueIndex("email_idx").on(users.email),
  }),
);

export const userRelations = relations(users, ({ one, many }) => ({
  followers: many(followers),
  following: many(followers),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
