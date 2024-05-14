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
import { categories } from "./categories";
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
    categoryId: integer("category_id")
      .references(() => categories.id, {
        onDelete: "no action",
      })
      .notNull(),
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
    userIdIndex: index("user_id_idx").on(prompts.userId),
  })
);

export type Prompt = typeof prompts.$inferSelect;
export type NewPrompt = typeof prompts.$inferInsert;
