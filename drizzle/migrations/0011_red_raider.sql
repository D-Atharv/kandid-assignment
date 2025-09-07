ALTER TABLE "verificationToken" RENAME TO "verification";--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "userId" TO "id";--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "type" TO "account_id";--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "provider" TO "provider_id";--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "providerAccountId" TO "user_id";--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "expires_at" TO "access_token_expires_at";--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "token_type" TO "refresh_token_expires_at";--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "session_state" TO "password";--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "sessionToken" TO "id";--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "userId" TO "expires_at";--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "expires" TO "token";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "firstName" TO "name";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "lastName" TO "image";--> statement-breakpoint
ALTER TABLE "verification" RENAME COLUMN "token" TO "id";--> statement-breakpoint
ALTER TABLE "verification" RENAME COLUMN "expires" TO "value";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_provider_providerAccountId_pk";--> statement-breakpoint
ALTER TABLE "verification" DROP CONSTRAINT "verificationToken_identifier_token_pk";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email_verified" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email_verified" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "ip_address" text;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "user_agent" text;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "verification" ADD COLUMN "expires_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "verification" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "verification" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "hashedPassword";--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_token_unique" UNIQUE("token");