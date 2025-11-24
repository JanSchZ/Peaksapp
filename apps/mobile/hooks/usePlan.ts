import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';

export interface WorkoutBlock {
    title: string;
    volume: string;
    exercises: string[];
}

export interface PlanDay {
    id: string;
    week_id: string;
    day_of_week: number;
    date: string;
    workout_data: WorkoutBlock | null;
    is_rest_day: boolean;
}

export interface PlanWeek {
    id: string;
    plan_id: string;
    week_number: number;
    focus: string;
    volume_tier: string;
    days: PlanDay[];
}

export interface Plan {
    id: string;
    title: string;
    goal: string;
    weeks: PlanWeek[];
}

export function usePlan() {
    const { user } = useUser();
    const queryClient = useQueryClient();

    // Fetch the active plan for the current user (coach view)
    // Note: In a real app, we'd pass a specific planId or athleteId
    const { data: plan, isLoading, error } = useQuery({
        queryKey: ['plan', user?.id],
        queryFn: async () => {
            if (!user) return null;

            // 1. Get the latest plan
            const { data: plans, error: planError } = await supabase
                .from('plans')
                .select('*')
                .eq('coach_id', user.id)
                .order('created_at', { ascending: false })
                .limit(1);

            if (planError) throw planError;
            if (!plans || plans.length === 0) return null;

            const currentPlan = plans[0];

            // 2. Get weeks for this plan
            const { data: weeks, error: weeksError } = await supabase
                .from('plan_weeks')
                .select('*')
                .eq('plan_id', currentPlan.id)
                .order('week_number', { ascending: true });

            if (weeksError) throw weeksError;

            // 3. Get days for these weeks
            const weekIds = weeks.map(w => w.id);
            const { data: days, error: daysError } = await supabase
                .from('plan_days')
                .select('*')
                .in('week_id', weekIds)
                .order('date', { ascending: true });

            if (daysError) throw daysError;

            // 4. Assemble the structure
            const fullWeeks = weeks.map(week => ({
                ...week,
                days: days.filter(d => d.week_id === week.id)
            }));

            return {
                ...currentPlan,
                weeks: fullWeeks
            } as Plan;
        },
        enabled: !!user,
    });

    // Mutation to save a day's workout
    const saveDayMutation = useMutation({
        mutationFn: async ({ dayId, workoutData }: { dayId: string; workoutData: WorkoutBlock | null }) => {
            const { data, error } = await supabase
                .from('plan_days')
                .update({ workout_data: workoutData })
                .eq('id', dayId)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plan', user?.id] });
        },
    });

    // Helper to create a new plan (for testing/initialization)
    const createPlanMutation = useMutation({
        mutationFn: async (title: string) => {
            if (!user) throw new Error('No user');

            // Create Plan
            const { data: plan, error: planError } = await supabase
                .from('plans')
                .insert({
                    coach_id: user.id,
                    title: title,
                    start_date: new Date().toISOString(),
                    goal: 'General Fitness'
                })
                .select()
                .single();

            if (planError) throw planError;

            // Create 4 Weeks
            const weeksData = Array.from({ length: 4 }).map((_, i) => ({
                plan_id: plan.id,
                week_number: i + 1,
                focus: 'Hypertrophy',
                volume_tier: 'Medium'
            }));

            const { data: weeks, error: weeksError } = await supabase
                .from('plan_weeks')
                .insert(weeksData)
                .select();

            if (weeksError) throw weeksError;

            // Create Days for each week
            const daysData = [];
            for (const week of weeks) {
                for (let i = 0; i < 7; i++) {
                    const date = new Date();
                    date.setDate(date.getDate() + (week.week_number - 1) * 7 + i);
                    daysData.push({
                        week_id: week.id,
                        day_of_week: i,
                        date: date.toISOString(),
                        is_rest_day: i === 1 || i === 3 || i === 6 // Mock rest days
                    });
                }
            }

            const { error: daysError } = await supabase
                .from('plan_days')
                .insert(daysData);

            if (daysError) throw daysError;

            return plan;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plan', user?.id] });
        }
    });

    return {
        plan,
        isLoading,
        error,
        saveDay: saveDayMutation.mutate,
        createPlan: createPlanMutation.mutate
    };
}
