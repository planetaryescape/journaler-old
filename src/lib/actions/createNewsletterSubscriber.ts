"use server";

import { db } from "@/db";
import { logger } from "@/lib/logger";
import { insertNewsletterSubscriberSchema } from "@/lib/zod-schemas/newsletter-subscriber";
import {
  NewNewsletterSubscriber,
  newsletterSubscribers,
} from "../../db/schema";

export const createNewsletterSubscriber = async (
  data: NewNewsletterSubscriber
) => {
  const newNewsletterSubscriber = insertNewsletterSubscriberSchema.parse(data);
  const context = {
    tracePath: "createNewsletterSubscriber",
    data: { newNewsletterSubscriber },
  };
  try {
    logger.info(
      { ...context, data: { newNewsletterSubscriber } },
      "Creating new newsletter subscriber"
    );
    const result = await db
      .insert(newsletterSubscribers)
      .values(data)
      .returning();
    logger.debug(
      { ...context, data: { result } },
      "Created new newsletter subscriber"
    );
    return { result };
  } catch (error) {
    logger.error(
      { ...context, error },
      "Error creating new newsletter subscriber"
    );
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};
