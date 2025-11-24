import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';

export function useTodaysWorkout() {
    const { user } = useUser();

    return useQuery({
        queryKey: ['todaysWorkout', user?.id],
        queryFn: async () => {
            if (!user) return null;

            const today = new Date().toISOString().split('T')[0];

            const { data, error } = await supabase
                .from('workouts')
                .select(`
                    id,
                    title,
                    duration,
                    focus,
                    week,
                    workout_exercises (
                        id,
                        sets,
                        reps,
                        rpe,
                        exercises (
                            id,
                            name
                        )
                    )
                `)
                .eq('user_id', user.id)
                .eq('date', today)
                .maybeSingle();

            if (error) {
                console.error('Error fetching workout:', error);
                throw error;
            }

            if (!data) return null;

            // Transform data to match UI expectations
            return {
                id: data.id,
                title: data.title,
                duration: data.duration,
                focus: data.focus,
                week: data.week,
                exercises: data.workout_exercises.map((we: any) => ({
                    id: we.id,
                    name: we.exercises?.name || 'Unknown Exercise',
                    sets: we.sets,
                    reps: we.reps,
                    rpe: we.rpe
                }))
            };
        },
        enabled: !!user,
    });
}
