import { env } from "@/env";

const isDev = env.NODE_ENV === "development";

export const config = {
  baseUrl: isDev ? "http://localhost:3000" : "https://journaler.me",
  engagementScores: {
    view: 1,
    upvote: 2,
    downvote: 3,
    comment: 4,
    save: 3,
    share: 5,
  },
};
