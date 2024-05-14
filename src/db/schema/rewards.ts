import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const rewards = pgTable("rewards", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  criteria: text("criteria").notNull(),
});

export type Reward = typeof rewards.$inferSelect;
export type NewReward = typeof rewards.$inferInsert;
