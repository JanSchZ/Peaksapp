import { foreignKey, pgTable, uuid, text, timestamp, jsonb, boolean, integer, pgEnum, numeric } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["coach", "assistant", "athlete", "admin"]);

export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});

export const memberships = pgTable("memberships", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  role: roleEnum("role").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});

export const groups = pgTable(
  "groups",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
    name: text("name").notNull(),
    description: text("description"),
    parentGroupId: uuid("parent_group_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    parentGroupFk: foreignKey({
      columns: [table.parentGroupId],
      foreignColumns: [table.id]
    }).onDelete("set null")
  })
);

export const workouts = pgTable("workouts", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  title: text("title").notNull(),
  notes: text("notes"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  plannedAt: timestamp("planned_at", { withTimezone: true }),
  block: text("block"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});

export const workoutItems = pgTable("workout_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  workoutId: uuid("workout_id").references(() => workouts.id).notNull(),
  sequence: integer("sequence").notNull(),
  exerciseName: text("exercise_name").notNull(),
  prescription: jsonb("prescription").$type<{ sets: number; reps?: number; tempo?: string; load?: string }>().default({ sets: 1 })
});

export const assignments = pgTable("assignments", {
  id: uuid("id").defaultRandom().primaryKey(),
  workoutId: uuid("workout_id").references(() => workouts.id).notNull(),
  athleteId: uuid("athlete_id").references(() => users.id).notNull(),
  status: text("status").default("planned"),
  scheduledFor: timestamp("scheduled_for", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  assignmentId: uuid("assignment_id").references(() => assignments.id).notNull(),
  athleteId: uuid("athlete_id").references(() => users.id).notNull(),
  status: text("status").default("in_progress"),
  perceivedEffort: integer("perceived_effort"),
  readiness: integer("readiness"),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  comments: text("comments"),
  metrics: jsonb("metrics").$type<Record<string, unknown>>().default({})
});

export const setLogs = pgTable("set_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id").references(() => sessions.id).notNull(),
  itemId: uuid("item_id").references(() => workoutItems.id).notNull(),
  setNumber: integer("set_number").notNull(),
  reps: integer("reps"),
  load: numeric("load", { precision: 10, scale: 2 }),
  rir: integer("rir"),
  durationSec: integer("duration_sec"),
  mediaUrl: text("media_url")
});

export const metrics = pgTable("metrics", {
  id: uuid("id").defaultRandom().primaryKey(),
  athleteId: uuid("athlete_id").references(() => users.id).notNull(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  type: text("type").notNull(),
  unit: text("unit").notNull(),
  value: numeric("value", { precision: 12, scale: 4 }).notNull(),
  collectedAt: timestamp("collected_at", { withTimezone: true }).notNull(),
  source: text("source").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({})
});

export const prs = pgTable("prs", {
  id: uuid("id").defaultRandom().primaryKey(),
  athleteId: uuid("athlete_id").references(() => users.id).notNull(),
  exerciseName: text("exercise_name").notNull(),
  value: numeric("value", { precision: 12, scale: 4 }).notNull(),
  unit: text("unit").notNull(),
  recordedAt: timestamp("recorded_at", { withTimezone: true }).notNull(),
  source: text("source").default("manual")
});

export const attachments = pgTable("attachments", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  ownerId: uuid("owner_id").references(() => users.id).notNull(),
  type: text("type").notNull(),
  url: text("url").notNull(),
  bucket: text("bucket").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({})
});

export type Organization = typeof organizations.$inferSelect;
export type User = typeof users.$inferSelect;
export type Membership = typeof memberships.$inferSelect;
export type Workout = typeof workouts.$inferSelect;
