import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { promptCategories } from "./prompt-categories";
import { users } from "./users";

export const prompts = pgTable(
  "prompts",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    title: varchar("title").notNull(),
    content: text("content").notNull(),
    viewsCount: integer("views_count").notNull().default(0),
    createdAt: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at", {})
      .$default(() => new Date())
      .notNull(),
  },
  (prompts) => ({
    uniqueIndex: uniqueIndex("title_unique").on(prompts.title, prompts.userId),
    userIdIndex: index("prompts_user_id_idx").on(prompts.userId),
  })
);

export const promptRelations = relations(prompts, ({ one, many }) => ({
  user: one(users, { fields: [prompts.userId], references: [users.id] }),
  promptCategory: many(promptCategories),
}));

export type Prompt = typeof prompts.$inferSelect;
export type NewPrompt = typeof prompts.$inferInsert;
