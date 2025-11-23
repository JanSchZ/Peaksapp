'use server';

import { createClient } from '@/lib/supabase'; // We need a server-side client
import { seasons, macrocycles, mesocycles } from '@peaks/core';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { v4 as uuidv4 } from 'uuid';

// Note: In a real app, we'd use a shared DB connection instance
// For now, we'll create a connection per action for simplicity in MVP
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client);

export async function saveSeasonPlan(data: any) {
    // 1. Validate User
    // In a real server action, we'd use Supabase Auth to get the user ID
    // const supabase = createClient();
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) throw new Error('Unauthorized');

    // Mock User ID for MVP (Replace with real Auth ID later)
    const userId = '00000000-0000-0000-0000-000000000000';

    try {
        // 2. Create Season
        const seasonId = uuidv4();
        await db.insert(seasons).values({
            id: seasonId,
            coach_id: userId,
            name: data.seasonName,
            start_date: new Date(data.startDate),
            end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Default 1 year
        });

        // 3. Create Macrocycles & Mesocycles
        for (const macro of data.macrocycles) {
            await db.insert(macrocycles).values({
                id: macro.id,
                season_id: seasonId,
                name: macro.name,
                type: macro.type,
                start_date: new Date(macro.startDate),
                end_date: new Date(macro.endDate),
            });

            for (const meso of macro.mesocycles) {
                await db.insert(mesocycles).values({
                    id: meso.id,
                    macrocycle_id: macro.id,
                    name: meso.name,
                    weeks: meso.weeks,
                    focus: meso.focus,
                });
            }
        }

        return { success: true, seasonId };
    } catch (error) {
        console.error('Failed to save plan:', error);
        return { success: false, error: 'Failed to save plan' };
    }
}
