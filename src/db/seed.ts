import { logger } from "@/lib/logger";
import { createSeedClient } from "@snaplet/seed";

createSeedClient()
  .then(async (seed) => {
    // Truncate all tables in the database
    await seed.$resetDatabase();

    const { users } = await seed.users((x) =>
      x(10, { user_achievements: (x) => x({ min: 0, max: 3 }) })
    );
    const followers = await seed.followers((x) => x(10), {
      connect: { users },
    });

    const prompts = await seed.prompts(
      (x) =>
        x(10, {
          comments: (x) => x({ min: 0, max: 3 }),
          interactions: (x) => x({ min: 0, max: 100 }),
        }),
      { connect: { users } }
    );
    logger.info(
      {
        prompts: Object.keys(prompts),
        followers: Object.keys(followers),
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
