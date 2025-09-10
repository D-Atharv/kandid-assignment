ALTER TABLE "campaigns" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "status" SET DEFAULT 'Draft'::text;--> statement-breakpoint
DROP TYPE "public"."campaign_status";--> statement-breakpoint
CREATE TYPE "public"."campaign_status" AS ENUM('Draft', 'Active', 'Paused', 'Completed');--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "status" SET DEFAULT 'Draft'::"public"."campaign_status";--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "status" SET DATA TYPE "public"."campaign_status" USING "status"::"public"."campaign_status";--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "campaign_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "campaign_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "campaigns" ADD COLUMN "successful_leads" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "last_contact" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "campaigns" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "campaigns" DROP COLUMN "request_status";--> statement-breakpoint
ALTER TABLE "campaigns" DROP COLUMN "connection_status";--> statement-breakpoint
ALTER TABLE "campaigns" DROP COLUMN "owner";--> statement-breakpoint
ALTER TABLE "leads" DROP COLUMN "title";--> statement-breakpoint
ALTER TABLE "leads" DROP COLUMN "avatar";--> statement-breakpoint
ALTER TABLE "leads" DROP COLUMN "campaign_name";--> statement-breakpoint
ALTER TABLE "leads" DROP COLUMN "activity";--> statement-breakpoint
ALTER TABLE "leads" DROP COLUMN "last_contact_date";--> statement-breakpoint
ALTER TABLE "leads" DROP COLUMN "author";--> statement-breakpoint
ALTER TABLE "leads" DROP COLUMN "last_action";--> statement-breakpoint
ALTER TABLE "leads" DROP COLUMN "sender";--> statement-breakpoint
ALTER TABLE "leads" DROP COLUMN "timeline";--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_email_unique" UNIQUE("email");