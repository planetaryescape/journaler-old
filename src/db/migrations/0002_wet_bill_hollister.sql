ALTER TABLE "prompts" DROP CONSTRAINT "prompts_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "prompts" DROP COLUMN IF EXISTS "category_id";