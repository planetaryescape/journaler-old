import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { prompts } from "./prompts";
import { users } from "./users";

export const comments = pgTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    promptId: integer("prompt_id").references(() => prompts.id, {
      onDelete: "cascade",
    }),
    userId: integer("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at", {})
      .$default(() => new Date())
      .notNull(),
  },
  (comments) => ({
    userIdIndex: index("user_id_idx").on(comments.userId),
    promptIdIndex: index("prompt_id_idx").on(comments.promptId),
  })
);

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
