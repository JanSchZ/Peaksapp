import { pgTable, uuid, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

// --- Shared Columns Helper ---
const timestamps = {
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
    deleted_at: timestamp('deleted_at', { withTimezone: true }), // Soft Delete
};

// --- Users & Auth ---
// Managed by Supabase Auth, but we reference them here for relations
export const users = pgTable('users', {
    id: uuid('id').primaryKey().notNull(),
    email: text('email').notNull(),
    role: text('role', { enum: ['coach', 'athlete', 'admin'] }).default('athlete').notNull(),
    full_name: text('full_name'),
    avatar_url: text('avatar_url'),
    ...timestamps,
});

// --- Periodization Hierarchy ---

// 1. Seasons (Temporadas)
export const seasons = pgTable('seasons', {
    id: uuid('id').defaultRandom().primaryKey(),
    coach_id: uuid('coach_id').references(() => users.id).notNull(),
    athlete_id: uuid('athlete_id').references(() => users.id), // Nullable if template
    name: text('name').notNull(), // e.g., "Road to Olympics 2026"
    start_date: timestamp('start_date', { withTimezone: true }).notNull(),
    end_date: timestamp('end_date', { withTimezone: true }).notNull(),
    goal: text('goal'),
    ...timestamps,
});

// 2. Macrocycles (Fases Grandes)
export const macrocycles = pgTable('macrocycles', {
    id: uuid('id').defaultRandom().primaryKey(),
    season_id: uuid('season_id').references(() => seasons.id).notNull(),
    name: text('name').notNull(), // e.g., "General Prep"
    type: text('type', { enum: ['preparatory', 'competitive', 'transition'] }).notNull(),
    start_date: timestamp('start_date', { withTimezone: true }).notNull(),
    end_date: timestamp('end_date', { withTimezone: true }).notNull(),
    ...timestamps,
});

// 3. Mesocycles (Bloques de 4-6 semanas)
export const mesocycles = pgTable('mesocycles', {
    id: uuid('id').defaultRandom().primaryKey(),
    macrocycle_id: uuid('macrocycle_id').references(() => macrocycles.id).notNull(),
    name: text('name').notNull(), // e.g., "Hypertrophy Block 1"
    focus: text('focus', { enum: ['hypertrophy', 'strength', 'power', 'endurance', 'technique'] }).notNull(),
    weeks_count: integer('weeks_count').notNull(),
    order_index: integer('order_index').notNull(), // To order within macro
    ...timestamps,
});

// 4. Microcycles (Semanas)
export const microcycles = pgTable('microcycles', {
    id: uuid('id').defaultRandom().primaryKey(),
    mesocycle_id: uuid('mesocycle_id').references(() => mesocycles.id).notNull(),
    name: text('name').notNull(), // e.g., "Week 1 - Accumulation"
    week_number: integer('week_number').notNull(),
    is_deload: boolean('is_deload').default(false),
    ...timestamps,
});

// 5. Planned Sessions (Plantillas de Entreno)
export const planned_sessions = pgTable('planned_sessions', {
    id: uuid('id').defaultRandom().primaryKey(),
    microcycle_id: uuid('microcycle_id').references(() => microcycles.id).notNull(),
    name: text('name').notNull(), // e.g., "Leg Day Hypertrophy"
    day_of_week: integer('day_of_week').notNull(), // 0=Sunday, 1=Monday...
    rpe_target: integer('rpe_target'),
    notes: text('notes'),
    ...timestamps,
});

// --- Library ---
export const exercises = pgTable('exercises', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    video_url: text('video_url'),
    muscle_group: text('muscle_group'), // e.g., "legs", "chest"
    movement_pattern: text('movement_pattern'), // e.g., "squat", "hinge"
    ...timestamps,
});

// --- Execution (Logs) ---
// SEPARATE from Planned Sessions to ensure history is immutable
export const performed_sessions = pgTable('performed_sessions', {
    id: uuid('id').defaultRandom().primaryKey(),
    planned_session_id: uuid('planned_session_id').references(() => planned_sessions.id), // Link to plan (optional)
    athlete_id: uuid('athlete_id').references(() => users.id).notNull(),
    date: timestamp('date', { withTimezone: true }).defaultNow().notNull(),
    rpe_actual: integer('rpe_actual'),
    duration_minutes: integer('duration_minutes'),
    notes: text('notes'), // Journal entry
    ...timestamps,
});

export const performed_sets = pgTable('performed_sets', {
    id: uuid('id').defaultRandom().primaryKey(),
    performed_session_id: uuid('performed_session_id').references(() => performed_sessions.id).notNull(),
    exercise_id: uuid('exercise_id').references(() => exercises.id).notNull(),
    set_number: integer('set_number').notNull(),
    reps: integer('reps'),
    weight: integer('weight'), // Stored in grams or smallest unit to avoid float issues? Or just float. Let's use float for simplicity in MVP.
    weight_kg: integer('weight_kg'), // Using integer for simplicity, maybe numeric later
    rpe: integer('rpe'),
    ...timestamps,
});
