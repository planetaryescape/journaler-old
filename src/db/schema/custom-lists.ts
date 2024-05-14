import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const customLists = pgTable(
  "custom_lists",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    name: varchar("name").notNull(),
    description: text("description"),
    public: boolean("public").default(true),
    createdAt: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$default(() => new Date())
      .notNull(),
  },
  (customLists) => ({
    userIdIndex: index("custom_lists_user_id_idx").on(customLists.userId),
    nameUserUnique: uniqueIndex("name_user_unique").on(
      customLists.userId,
      customLists.name
    ),
  })
);

export type CustomLists = typeof customLists.$inferSelect;
export type NewCustomList = typeof customLists.$inferInsert;
