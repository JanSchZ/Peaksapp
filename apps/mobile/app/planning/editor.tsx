import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { CycleNavigator } from '../../components/planning/CycleNavigator';
import { AssistantSheet } from '../../components/ai/AssistantSheet';
import { MacroCycleView } from '../../components/planning/MacroCycleView';
import { Plus, MoreHorizontal, ClipboardPaste } from 'lucide-react-native';
import { usePlan, WorkoutBlock } from '../../hooks/usePlan';

export default function PlanningEditor() {
    const { plan, isLoading, saveDay, createPlan } = usePlan();
    const [currentWeek, setCurrentWeek] = useState(1);
    const [assistantVisible, setAssistantVisible] = useState(false);
    const [viewMode, setViewMode] = useState<'micro' | 'macro'>('micro');
    const [clipboard, setClipboard] = useState<WorkoutBlock | null>(null);

    // Derived state: Get the current week's days from the fetched plan
    const currentWeekData = plan?.weeks.find(w => w.week_number === currentWeek);
    const weekDays = currentWeekData?.days || [];

    const handlePrevious = () => setCurrentWeek(prev => Math.max(1, prev - 1));
    const handleNext = () => setCurrentWeek(prev => Math.min(plan?.weeks.length || 4, prev + 1));

    const handleCopy = (workout: WorkoutBlock) => {
        setClipboard(workout);
        Alert.alert('Copied', 'Workout copied to clipboard');
    };

    const handlePaste = (dayId: string) => {
        if (!clipboard) return;
        const newWorkout = { ...clipboard, title: clipboard.title + ' (Copy)' };

        // Optimistic update (UI will update when query refetches)
        saveDay({ dayId, workoutData: newWorkout });
        setClipboard(null);
    };

    const handleAIAction = (action: any) => {
        if (action.type === 'ADD_WORKOUT') {
            // Find first empty day in current week
            const emptyDay = weekDays.find(d => d.workout_data === null);

            if (emptyDay) {
                const newWorkout: WorkoutBlock = {
                    title: action.payload.title,
                    volume: 'Planned',
                    exercises: action.payload.exercises || []
                };

                saveDay({ dayId: emptyDay.id, workoutData: newWorkout });
                setAssistantVisible(false);
                Alert.alert('Added', `Added ${action.payload.title} to ${new Date(emptyDay.date).toLocaleDateString('en-US', { weekday: 'long' })}`);
            } else {
                Alert.alert('Full', 'No empty days available in this week.');
            }
        }
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
        );
    }

    if (!plan) {
        return (
            <View style={styles.centered}>
                <Text style={styles.emptyText}>No Active Plan Found</Text>
                <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => createPlan('New Macrocycle')}
                >
                    <Text style={styles.createButtonText}>Create New Plan</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {viewMode === 'macro' ? (
                <MacroCycleView onSelectWeek={(week) => {
                    setCurrentWeek(week);
                    setViewMode('micro');
                }} />
            ) : (
                <>
                    <CycleNavigator
                        currentPeriod={`Week ${currentWeek}`}
                        periodLabel={`${plan.title} • ${currentWeekData?.focus || 'General'}`}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        onZoomOut={() => setViewMode('macro')}
                    />

                    <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                        {weekDays.map((day) => {
                            const dateObj = new Date(day.date);
                            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
                            const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                            return (
                                <View key={day.id} style={styles.dayRow}>
                                    <View style={styles.dayHeader}>
                                        <Text style={styles.dayName}>{dayName}</Text>
                                        <Text style={styles.dayDate}>{dateStr}</Text>
                                    </View>

                                    <View style={styles.dayContent}>
                                        {day.workout_data ? (
                                            <TouchableOpacity
                                                style={styles.workoutBlock}
                                                onLongPress={() => handleCopy(day.workout_data!)}
                                            >
                                                <View>
                                                    <Text style={styles.workoutTitle}>{day.workout_data.title}</Text>
                                                    <Text style={styles.workoutVolume}>{day.workout_data.volume}</Text>
                                                </View>
                                                <TouchableOpacity style={styles.moreButton}>
                                                    <MoreHorizontal size={20} color={Colors.light.mutedForeground} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity
                                                style={styles.emptyBlock}
                                                onPress={() => handlePaste(day.id)}
                                            >
                                                {clipboard ? (
                                                    <>
                                                        <ClipboardPaste size={20} color={Colors.light.primary} />
                                                        <Text style={[styles.addText, { color: Colors.light.primary }]}>Paste Workout</Text>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Plus size={20} color={Colors.light.mutedForeground} />
                                                        <Text style={styles.addText}>Add Session</Text>
                                                    </>
                                                )}
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>

                    {/* Floating Action Button for AI Assistant */}
                    <TouchableOpacity style={styles.aiFab} onPress={() => setAssistantVisible(true)}>
                        <Text style={styles.aiFabText}>✨ Ask Peaks AI</Text>
                    </TouchableOpacity>

                    <AssistantSheet
                        visible={assistantVisible}
                        onClose={() => setAssistantVisible(false)}
                        onAction={handleAIAction}
                    />
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
    },
    emptyText: {
        fontSize: 18,
        color: Colors.light.mutedForeground,
        marginBottom: 20,
    },
    createButton: {
        backgroundColor: Colors.light.primary,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    createButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100, // Space for FAB
    },
    dayRow: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 12,
    },
    dayHeader: {
        width: 60,
        alignItems: 'center',
        paddingTop: 12,
    },
    dayName: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.light.mutedForeground,
        textTransform: 'uppercase',
    },
    dayDate: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    dayContent: {
        flex: 1,
    },
    workoutBlock: {
        backgroundColor: Colors.light.card,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    workoutTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 4,
    },
    workoutVolume: {
        fontSize: 12,
        color: Colors.light.mutedForeground,
    },
    moreButton: {
        padding: 4,
    },
    emptyBlock: {
        height: 70,
        borderWidth: 2,
        borderColor: Colors.light.border,
        borderStyle: 'dashed',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    addText: {
        color: Colors.light.mutedForeground,
        fontWeight: '600',
    },
    aiFab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: Colors.light.text, // Dark button
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    aiFabText: {
        color: Colors.light.background,
        fontWeight: '600',
        fontSize: 16,
    },
});
