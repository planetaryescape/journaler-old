import { logger } from "@/lib/logger";
import { createSeedClient } from "@snaplet/seed";

createSeedClient()
  .then(async (seed) => {
    // Truncate all tables in the database
    await seed.$resetDatabase();

    const { users } = await seed.users((x) =>
      x(10, { user_achievements: (x) => x({ min: 0, max: 3 }) })
    );

    const { categories } = await seed.categories((x) => x(10));

    const followers = await seed.followers((x) => x(10), {
      connect: { users },
    });

    const customLists = await seed.custom_lists((x) => x(10), {
      connect: { users },
    });

    const { prompts } = await seed.prompts(
      (x) =>
        x(10, {
          comments: (x) => x({ min: 0, max: 3 }),
          interactions: (x) => x({ min: 0, max: 100 }),
        }),
      { connect: { users, categories } }
    );

    const promptCategories = await seed.prompt_categories((x) => x(10), {
      connect: { prompts, categories },
    });

    logger.info(
      {
        followers: Object.keys(followers),
        promptCategories: Object.keys(promptCategories),
        customLists: Object.keys(customLists),
        users: users.length,
      },
      "Successfully seeded database"
    );
  })
  .catch((err) => {
    logger.error({ err }, "Error seeding database");
  })
  .finally(() => {
    process.exit();
  });
