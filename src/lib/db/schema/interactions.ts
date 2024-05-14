import {
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { prompts } from "./prompts";
import { users } from "./users";

export const interactionTypeEnum = pgEnum("type", ["like", "dislike", "save"]);

export const interactions = pgTable(
  "interactions",
  {
    id: serial("id").primaryKey(),
    promptId: integer("prompt_id")
      .references(() => prompts.id, {
        onDelete: "cascade",
      })
      .notNull(),
    userId: integer("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    type: interactionTypeEnum("type").notNull(),
    createdAt: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
  },
  (interactions) => ({
    userIdIndex: index("interactions_user_id_idx").on(interactions.userId),
    promptIdIndex: index("interactions_prompt_id_idx").on(
      interactions.promptId
    ),
  })
);

export type Interaction = typeof interactions.$inferSelect;
export type NewInteraction = typeof interactions.$inferInsert;
