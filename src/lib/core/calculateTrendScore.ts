import { config } from "@/lib/config";
import { intervalToDuration } from "date-fns";

export const calculateTrendScore = ({
  view = 0,
  upvote = 0,
  downvote = 0,
  comment = 0,
  save = 0,
  share = 0,
  createdAt,
}: {
  view: number;
  upvote: number;
  downvote: number;
  comment: number;
  save: number;
  share: number;
  createdAt: Date;
}) => {
  const engagementScores = config.engagementScores;
  const daysSinceCreation =
    intervalToDuration({
      start: createdAt,
      end: new Date(),
    }).days ?? Infinity;

  const trendScore =
    (view * engagementScores.view +
      upvote * engagementScores.upvote +
      downvote * engagementScores.downvote +
      comment * engagementScores.comment +
      save * engagementScores.save +
      share * engagementScores.share) /
    (1 + daysSinceCreation);

  return trendScore;
};
