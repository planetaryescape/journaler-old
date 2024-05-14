import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { prompts } from "./prompts";

export const promptCategories = pgTable(
  "prompt_categories",
  {
    id: serial("id").primaryKey(),
    promptId: integer("prompt_id")
      .references(() => prompts.id, {
        onDelete: "cascade",
      })
      .notNull(),
    categoryId: integer("category_id")
      .references(() => categories.id, {
        onDelete: "cascade",
      })
      .notNull(),
    createdAt: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
  },
  (promptCategories) => ({
    promptIdIndex: index("prompt_categories_prompt_id_idx").on(
      promptCategories.promptId
    ),
    categoryIdIndex: index("prompt_categories_category_id_idx").on(
      promptCategories.categoryId
    ),
  })
);

export const promptCategoriesRelations = relations(
  promptCategories,
  ({ one }) => ({
    prompt: one(prompts, {
      fields: [promptCategories.promptId],
      references: [prompts.id],
    }),
    category: one(categories, {
      fields: [promptCategories.categoryId],
      references: [categories.id],
    }),
  })
);

export type PromptCategory = typeof promptCategories.$inferSelect;
export type NewPromptCategory = typeof promptCategories.$inferInsert;
