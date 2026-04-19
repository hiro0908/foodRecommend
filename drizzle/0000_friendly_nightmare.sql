CREATE TABLE "food_master" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"calories" real NOT NULL,
	"protein" real NOT NULL,
	"iron" real NOT NULL,
	"calcium" real NOT NULL,
	"vitamin_c" real NOT NULL,
	"serving_size" text
);
--> statement-breakpoint
CREATE TABLE "meal_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"food_id" integer NOT NULL,
	"quantity" real DEFAULT 1,
	"logged_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "meal_records" ADD CONSTRAINT "meal_records_food_id_food_master_id_fk" FOREIGN KEY ("food_id") REFERENCES "public"."food_master"("id") ON DELETE no action ON UPDATE no action;