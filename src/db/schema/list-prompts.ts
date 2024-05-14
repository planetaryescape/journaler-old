import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { customLists } from "./custom-lists";
import { prompts } from "./prompts";

export const listPrompts = pgTable(
  "list_prompts",
  {
    id: serial("id").primaryKey(),
    customListId: integer("custom_list_id")
      .references(() => customLists.id, { onDelete: "cascade" })
      .notNull(),
    promptId: integer("prompt_id")
      .references(() => prompts.id, { onDelete: "cascade" })
      .notNull(),
    addedAt: timestamp("added_at")
      .$default(() => new Date())
      .notNull(),
  },
  (listPrompts) => ({
    listIdIndex: index("list_id_idx").on(listPrompts.customListId),
    promptIdIndex: index("list_prompts_prompt_id_idx").on(listPrompts.promptId),
  })
);

export const listPromptsRelations = relations(listPrompts, ({ one }) => ({
  customList: one(customLists, {
    fields: [listPrompts.customListId],
    references: [customLists.id],
  }),
  prompt: one(prompts, {
    fields: [listPrompts.promptId],
    references: [prompts.id],
  }),
}));

export type ListPrompt = typeof listPrompts.$inferSelect;
export type NewListPrompt = typeof listPrompts.$inferInsert;
