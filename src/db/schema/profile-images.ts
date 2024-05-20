import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const profileImages = pgTable(
  "profile_images",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
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
    userIdIndex: index("images_user_id_idx").on(images.userId),
  }),
);

export const profileImageRelations = relations(profileImages, ({ one }) => ({
  user: one(users, { fields: [profileImages.userId], references: [users.id] }),
}));

export type ProfileImage = typeof profileImages.$inferSelect;
export type NewProfileImage = typeof profileImages.$inferInsert;
