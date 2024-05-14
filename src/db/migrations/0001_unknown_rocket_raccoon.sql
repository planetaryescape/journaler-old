CREATE TABLE IF NOT EXISTS "prompt_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"prompt_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prompt_categories" ADD CONSTRAINT "prompt_categories_prompt_id_prompts_id_fk" FOREIGN KEY ("prompt_id") REFERENCES "public"."prompts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prompt_categories" ADD CONSTRAINT "prompt_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "prompt_categories_prompt_id_idx" ON "prompt_categories" ("prompt_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "prompt_categories_category_id_idx" ON "prompt_categories" ("category_id");