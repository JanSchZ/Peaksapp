import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { CycleNavigator } from '../../components/planning/CycleNavigator';
import { AssistantSheet } from '../../components/ai/AssistantSheet';
import { Plus, MoreHorizontal } from 'lucide-react-native';

export default function PlanningEditor() {
    const [currentWeek, setCurrentWeek] = useState(1);
    const [assistantVisible, setAssistantVisible] = useState(false);

    // Mock data for the current week's plan
    const weekPlan = [
        { day: 'Monday', date: 'Oct 23', workout: { title: 'Squat Heavy', volume: '4,200kg' } },
        { day: 'Tuesday', date: 'Oct 24', workout: null }, // Rest day
        { day: 'Wednesday', date: 'Oct 25', workout: { title: 'Bench Press', volume: '3,100kg' } },
        { day: 'Thursday', date: 'Oct 26', workout: null },
        { day: 'Friday', date: 'Oct 27', workout: { title: 'Deadlift', volume: '5,150kg' } },
        { day: 'Saturday', date: 'Oct 28', workout: { title: 'Active Recovery', volume: 'Light' } },
        { day: 'Sunday', date: 'Oct 29', workout: null },
    ];

    const handlePrevious = () => setCurrentWeek(prev => Math.max(1, prev - 1));
    const handleNext = () => setCurrentWeek(prev => prev + 1);

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <CycleNavigator
                currentPeriod={`Week ${currentWeek}`}
                periodLabel="Mesocycle 1 • Hypertrophy"
                onPrevious={handlePrevious}
                onNext={handleNext}
                onZoomOut={() => console.log('Zoom out to Macro View')}
            />

            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                {weekPlan.map((day, index) => (
                    <View key={index} style={styles.dayRow}>
                        <View style={styles.dayHeader}>
                            <Text style={styles.dayName}>{day.day}</Text>
                            <Text style={styles.dayDate}>{day.date}</Text>
                        </View>

                        <View style={styles.dayContent}>
                            {day.workout ? (
                                <TouchableOpacity style={styles.workoutBlock}>
                                    <View>
                                        <Text style={styles.workoutTitle}>{day.workout.title}</Text>
                                        <Text style={styles.workoutVolume}>{day.workout.volume}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.moreButton}>
                                        <MoreHorizontal size={20} color={Colors.light.mutedForeground} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.emptyBlock}>
                                    <Plus size={20} color={Colors.light.mutedForeground} />
                                    <Text style={styles.addText}>Add Session</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Floating Action Button for AI Assistant */}
            <TouchableOpacity style={styles.aiFab} onPress={() => setAssistantVisible(true)}>
                <Text style={styles.aiFabText}>✨ Ask Peaks AI</Text>
            </TouchableOpacity>

            <AssistantSheet visible={assistantVisible} onClose={() => setAssistantVisible(false)} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
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
