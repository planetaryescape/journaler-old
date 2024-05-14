CREATE TABLE IF NOT EXISTS "custom_lists" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"description" text,
	"public" boolean DEFAULT true,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "list_prompts" (
	"id" serial PRIMARY KEY NOT NULL,
	"list_id" integer NOT NULL,
	"prompt_id" integer NOT NULL,
	"added_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "custom_lists" ADD CONSTRAINT "custom_lists_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "list_prompts" ADD CONSTRAINT "list_prompts_list_id_custom_lists_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."custom_lists"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "list_prompts" ADD CONSTRAINT "list_prompts_prompt_id_prompts_id_fk" FOREIGN KEY ("prompt_id") REFERENCES "public"."prompts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "custom_lists_user_id_idx" ON "custom_lists" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "name_user_unique" ON "custom_lists" ("user_id","name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "list_id_idx" ON "list_prompts" ("list_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "list_prompts_prompt_id_idx" ON "list_prompts" ("prompt_id");