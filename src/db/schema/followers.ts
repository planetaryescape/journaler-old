import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  primaryKey,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const followers = pgTable(
  "followers",
  {
    followerId: integer("follower_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    followedId: integer("followed_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    createdAt: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
  },
  (followers) => ({
    pk: primaryKey({
      name: "follower_id_followed_id_pk",
      columns: [followers.followerId, followers.followedId],
    }),
    followerIdIndex: index("follower_id_idx").on(followers.followerId),
    followedIdIndex: index("followed_id_idx").on(followers.followedId),
  }),
);

export const followersRelations = relations(followers, ({ one }) => ({
  follower: one(users, {
    fields: [followers.followedId],
    references: [users.id],
    relationName: "followers",
  }),
  followed: one(users, {
    fields: [followers.followerId],
    references: [users.id],
    relationName: "followed",
  }),
}));

export type Follower = typeof followers.$inferSelect;
export type NewFollower = typeof followers.$inferInsert;
