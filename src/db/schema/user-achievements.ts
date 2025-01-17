import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { rewards } from "./rewards";
import { users } from "./users";

export const userAchievements = pgTable(
  "user_achievements",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    rewardId: integer("reward_id")
      .references(() => rewards.id, {
        onDelete: "restrict",
      })
      .notNull(),
    achievedOn: timestamp("achieved_on")
      .$default(() => new Date())
      .notNull(),
  },
  (userAchievements) => ({
    userIdIndex: index("user_achievements_user_id_idx").on(
      userAchievements.userId
    ),
    rewardIdIndex: index("reward_id_idx").on(userAchievements.rewardId),
  })
);

export const userAchievementsRelations = relations(
  userAchievements,
  ({ one }) => ({
    user: one(users, {
      fields: [userAchievements.userId],
      references: [users.id],
    }),
    reward: one(rewards, {
      fields: [userAchievements.rewardId],
      references: [rewards.id],
    }),
  })
);

export type UserAchievement = typeof userAchievements.$inferSelect;
export type NewUserAchievement = typeof userAchievements.$inferInsert;
