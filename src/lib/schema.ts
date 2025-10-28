import { pgTable, uuid, text, boolean, integer, timestamp, serial } from "drizzle-orm/pg-core";

// Companies
export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description'),
  email: text('email').unique().notNull(),
  password: text('password').notNull(), // Store hashed passwords
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// FORM TABLE
export const form = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: integer("company_id").references(() => companies.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  location: text("location").default("PAN India"),
  employmentType: text("employment_type"),
  team: text("team"),
  totalResponses: integer("total_responses").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// JOB_FIELDS TABLE
export const jobFields = pgTable("job_fields", {
  id: uuid("id").defaultRandom().primaryKey(),
  formId: uuid("form_id").references(() => form.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  label: text("label").notNull(),
  type: text("type").notNull(),
  required: boolean("required").default(false),
});
