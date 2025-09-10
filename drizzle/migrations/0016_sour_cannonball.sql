ALTER TABLE "leads" DROP CONSTRAINT "leads_email_unique";--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "status" SET DEFAULT 'Inactive'::text;--> statement-breakpoint
DROP TYPE "public"."campaign_status";--> statement-breakpoint
CREATE TYPE "public"."campaign_status" AS ENUM('Active', 'Inactive');--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "status" SET DEFAULT 'Inactive'::"public"."campaign_status";--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "status" SET DATA TYPE "public"."campaign_status" USING "status"::"public"."campaign_status";--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "campaign_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "campaign_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "campaigns" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "campaigns" ADD COLUMN "request_status" jsonb;--> statement-breakpoint
ALTER TABLE "campaigns" ADD COLUMN "connection_status" jsonb;--> statement-breakpoint
ALTER TABLE "campaigns" ADD COLUMN "owner" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "title" varchar(255);--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "avatar" jsonb;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "campaign_name" varchar(255);--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "activity" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "last_contact_date" timestamp;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "author" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "last_action" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "sender" jsonb;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "timeline" jsonb;--> statement-breakpoint
ALTER TABLE "campaigns" DROP COLUMN "successful_leads";--> statement-breakpoint
ALTER TABLE "leads" DROP COLUMN "last_contact";