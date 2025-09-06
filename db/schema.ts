import { pgTable, serial,varchar, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";

export const campaignStatusEnum = pgEnum('campaign_status', ['Draft', 'Active', 'Paused', 'Completed']);
export const leadStatusEnum = pgEnum('lead_status', ['Pending', 'Contacted', 'Responded', 'Converted']);

/**
 * ## Campaigns Table
 * Stores information about each marketing campaign.
 */
export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  status: campaignStatusEnum("status").default('Draft').notNull(),
  totalLeads: integer("total_leads").default(0).notNull(),
  successfulLeads: integer("successful_leads").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * ## Leads Table
 * Stores individual leads. Each lead belongs to one campaign.
 */
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  company: varchar("company", { length: 255 }),
  status: leadStatusEnum("status").default('Pending').notNull(),
  lastContact: timestamp("last_contact", { withTimezone: true }),

  // This creates the one-to-many relationship.
  campaignId: integer("campaign_id").references(() => campaigns.id, { onDelete: 'cascade' }),
});