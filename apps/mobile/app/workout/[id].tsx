import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { ArrowLeft, Check, Clock, Info } from 'lucide-react-native';

// Mock data for the session (In real app, fetch by ID)
const SESSION_DATA = {
    id: '1',
    title: 'Lower Body Power',
    exercises: [
        {
            id: '1',
            name: 'Back Squat',
            sets: [
                { id: 's1', type: 'warmup', weight: 60, reps: 10, completed: true },
                { id: 's2', type: 'warmup', weight: 80, reps: 5, completed: true },
                { id: 's3', type: 'work', weight: 100, reps: 5, rpe: 8, completed: false },
                { id: 's4', type: 'work', weight: 100, reps: 5, rpe: 8, completed: false },
                { id: 's5', type: 'work', weight: 100, reps: 5, rpe: 8, completed: false },
            ]
        },
        {
            id: '2',
            name: 'Box Jumps',
            sets: [
                { id: 's6', type: 'work', weight: 0, reps: 5, completed: false },
                { id: 's7', type: 'work', weight: 0, reps: 5, completed: false },
                { id: 's8', type: 'work', weight: 0, reps: 5, completed: false },
            ]
        },
    ]
};

export default function WorkoutLogger() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [exercises, setExercises] = useState(SESSION_DATA.exercises);

    const toggleSet = (exerciseIndex: number, setIndex: number) => {
        const newExercises = [...exercises];
        newExercises[exerciseIndex].sets[setIndex].completed = !newExercises[exerciseIndex].sets[setIndex].completed;
        setExercises(newExercises);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft color={Colors.dark.text} size={24} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>{SESSION_DATA.title}</Text>
                    <View style={styles.timerContainer}>
                        <Clock size={14} color={Colors.dark.mutedForeground} />
                        <Text style={styles.timerText}>00:45:30</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.finishButton}>
                    <Text style={styles.finishButtonText}>Finish</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {exercises.map((exercise, exIndex) => (
                    <View key={exercise.id} style={styles.exerciseCard}>
                        <View style={styles.exerciseHeader}>
                            <Text style={styles.exerciseName}>{exercise.name}</Text>
                            <TouchableOpacity>
                                <Info size={20} color={Colors.dark.mutedForeground} />
                            </TouchableOpacity>
                        </View>

                        {/* Table Header */}
                        <View style={styles.setRowHeader}>
                            <Text style={[styles.colHeader, styles.colSet]}>SET</Text>
                            <Text style={[styles.colHeader, styles.colPrev]}>PREV</Text>
                            <Text style={[styles.colHeader, styles.colKg]}>KG</Text>
                            <Text style={[styles.colHeader, styles.colReps]}>REPS</Text>
                            <Text style={[styles.colHeader, styles.colCheck]}></Text>
                        </View>

                        {/* Sets */}
                        {exercise.sets.map((set, setIndex) => (
                            <View key={set.id} style={[styles.setRow, set.completed && styles.setRowCompleted]}>
                                <View style={styles.colSet}>
                                    <View style={[styles.setTypeIndicator, set.type === 'warmup' ? styles.warmupIndicator : styles.workIndicator]}>
                                        <Text style={styles.setTypeText}>{setIndex + 1}</Text>
                                    </View>
                                </View>
                                <Text style={[styles.colPrev, styles.prevText]}>100x5</Text>

                                <View style={styles.colKg}>
                                    <TextInput
                                        style={[styles.input, set.completed && styles.inputCompleted]}
                                        defaultValue={set.weight.toString()}
                                        keyboardType="numeric"
                                    />
                                </View>

                                <View style={styles.colReps}>
                                    <TextInput
                                        style={[styles.input, set.completed && styles.inputCompleted]}
                                        defaultValue={set.reps.toString()}
                                        keyboardType="numeric"
                                    />
                                </View>

                                <TouchableOpacity
                                    style={[styles.checkButton, set.completed && styles.checkButtonCompleted]}
                                    onPress={() => toggleSet(exIndex, setIndex)}
                                >
                                    <Check size={16} color={set.completed ? Colors.dark.background : Colors.dark.mutedForeground} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.dark.text,
        textAlign: 'center',
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        marginTop: 2,
    },
    timerText: {
        fontSize: 12,
        color: Colors.dark.mutedForeground,
        fontVariant: ['tabular-nums'],
    },
    finishButton: {
        backgroundColor: Colors.dark.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    finishButtonText: {
        color: Colors.dark.primaryForeground,
        fontWeight: '600',
        fontSize: 14,
    },
    content: {
        padding: 20,
        gap: 24,
    },
    exerciseCard: {
        gap: 12,
    },
    exerciseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    exerciseName: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.dark.text,
    },
    setRowHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    colHeader: {
        fontSize: 10,
        fontWeight: '700',
        color: Colors.dark.mutedForeground,
        textAlign: 'center',
    },
    colSet: { width: 40, alignItems: 'center' },
    colPrev: { flex: 1, textAlign: 'center' },
    colKg: { width: 70, marginHorizontal: 4 },
    colReps: { width: 70, marginHorizontal: 4 },
    colCheck: { width: 40 },

    setRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.dark.card,
        borderRadius: 8,
        paddingVertical: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    setRowCompleted: {
        backgroundColor: Colors.dark.background,
        borderColor: Colors.dark.border,
        opacity: 0.8,
    },
    setTypeIndicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    warmupIndicator: {
        backgroundColor: Colors.dark.muted,
    },
    workIndicator: {
        backgroundColor: Colors.dark.accent,
    },
    setTypeText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.dark.text,
    },
    prevText: {
        fontSize: 12,
        color: Colors.dark.mutedForeground,
    },
    input: {
        backgroundColor: Colors.dark.background,
        color: Colors.dark.text,
        borderRadius: 6,
        paddingVertical: 8,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    inputCompleted: {
        backgroundColor: 'transparent',
        color: Colors.dark.mutedForeground,
        borderColor: 'transparent',
    },
    checkButton: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: Colors.dark.muted,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
    },
    checkButtonCompleted: {
        backgroundColor: '#22c55e', // Green-500
    },
});
