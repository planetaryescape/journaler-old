import { relations } from "drizzle-orm";
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
        onDelete: "no action",
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
    userIdIndex: index("comments_user_id_idx").on(comments.userId),
    promptIdIndex: index("comments_prompt_id_idx").on(comments.promptId),
  })
);

export const commentsRelations = relations(comments, ({ one }) => ({
  prompt: one(prompts, {
    fields: [comments.promptId],
    references: [prompts.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}));

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
