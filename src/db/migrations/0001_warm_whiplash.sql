CREATE TABLE IF NOT EXISTS "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"cloudinary_public_id" varchar NOT NULL,
	"url" varchar NOT NULL,
	"format" varchar NOT NULL,
	"original_filename" varchar NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "images_cloudinary_public_id_unique" UNIQUE("cloudinary_public_id"),
	CONSTRAINT "images_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"cloudinary_public_id" varchar NOT NULL,
	"url" varchar NOT NULL,
	"format" varchar NOT NULL,
	"original_filename" varchar NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "profile_images_cloudinary_public_id_unique" UNIQUE("cloudinary_public_id"),
	CONSTRAINT "profile_images_url_unique" UNIQUE("url")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "images" ADD CONSTRAINT "images_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile_images" ADD CONSTRAINT "profile_images_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "images_prompt_id_idx" ON "images" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "images_user_id_idx" ON "profile_images" ("user_id");