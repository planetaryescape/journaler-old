"use server";

import { db } from "@/db";
import { logger } from "@/lib/logger";
import { insertNewsletterSubscriberSchema } from "@/lib/zod-schemas/newsletter-subscriber";
import {
  NewNewsletterSubscriber,
  NewsletterSubscriber,
  newsletterSubscribers,
} from "../../db/schema";
import {
  Entity,
  ErrorEntity,
  formatEntity,
  formatErrorEntity,
} from "../utils/formatEntity";

export const createNewsletterSubscriber = async (
  data: NewNewsletterSubscriber,
): Promise<Entity<NewsletterSubscriber> | ErrorEntity> => {
  const newNewsletterSubscriber = insertNewsletterSubscriberSchema.parse(data);
  const context = {
    tracePath: "createNewsletterSubscriber",
    data: { newNewsletterSubscriber },
  };
  try {
    logger.info(
      { ...context, data: { newNewsletterSubscriber } },
      "Creating new newsletter subscriber",
    );
    const result = await db
      .insert(newsletterSubscribers)
      .values(data)
      .returning();
    logger.debug(
      { ...context, data: result[0] },
      "Created new newsletter subscriber",
    );
    return formatEntity(result[0], "newsletter-subscriber");
  } catch (error) {
    logger.error(
      { ...context, error },
      "Error creating new newsletter subscriber",
    );
    return formatErrorEntity(error instanceof Error ? error.message : error);
  }
};
