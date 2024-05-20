import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { prompts } from "./prompts";
import { users } from "./users";

export const images = pgTable(
  "images",
  {
    id: serial("id").primaryKey(),
    promptId: integer("user_id")
      .references(() => users.id, {
        onDelete: "no action",
      })
      .notNull(),
    cloudinaryPublicId: varchar("cloudinary_public_id").notNull().unique(),
    url: varchar("url").notNull().unique(),
    format: varchar("format").notNull(),
    originalFilename: varchar("original_filename").notNull(),
    createdAt: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at", {})
      .$default(() => new Date())
      .notNull(),
  },
  (images) => ({
    promptIdIndex: index("images_prompt_id_idx").on(images.promptId),
  }),
);

export const imagesRelations = relations(images, ({ one }) => ({
  prompt: one(prompts, { fields: [images.promptId], references: [prompts.id] }),
}));

export type Image = typeof images.$inferSelect;
export type NewImage = typeof images.$inferInsert;
