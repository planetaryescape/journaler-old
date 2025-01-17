import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { prompts } from "./prompts";
import { users } from "./users";

export const interactionTypeEnum = pgEnum("type", [
  "view",
  "upvote",
  "downvote",
  "save",
  "share",
]);

export const interactions = pgTable(
  "interactions",
  {
    id: serial("id"),
    promptId: integer("prompt_id")
      .references(() => prompts.id, {
        onDelete: "cascade",
      })
      .notNull(),
    userId: integer("user_id")
      .references(() => users.id, {
        onDelete: "no action",
      })
      .notNull(),
    type: interactionTypeEnum("type").notNull(),
    createdAt: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
  },
  (interactions) => ({
    interactionsPk: primaryKey({
      name: "user_id_prompt_id_type_pk",
      columns: [interactions.userId, interactions.promptId, interactions.type],
    }),
    userIdIndex: index("interactions_user_id_idx").on(interactions.userId),
    promptIdIndex: index("interactions_prompt_id_idx").on(
      interactions.promptId,
    ),
  }),
);

export const interactionsRelations = relations(interactions, ({ one }) => ({
  prompt: one(prompts, {
    fields: [interactions.promptId],
    references: [prompts.id],
  }),
  user: one(users, {
    fields: [interactions.userId],
    references: [users.id],
  }),
}));

export type Interaction = typeof interactions.$inferSelect;
export type NewInteraction = typeof interactions.$inferInsert;
