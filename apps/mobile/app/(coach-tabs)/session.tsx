import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Search, Plus, User, Dumbbell, ChevronRight } from 'lucide-react-native';

export default function SessionScreen() {
    const [selectedAthlete, setSelectedAthlete] = useState<string | null>(null);

    const renderAthleteSelector = () => (
        <View style={styles.selectorContainer}>
            <Text style={styles.stepTitle}>1. Select Athlete</Text>
            <View style={styles.searchBox}>
                <Search size={20} color={Colors.light.mutedForeground} />
                <TextInput
                    placeholder="Search athlete..."
                    placeholderTextColor={Colors.light.mutedForeground}
                    style={styles.input}
                />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentList}>
                {['Sarah J.', 'Mike T.', 'Tom B.', 'Emily C.'].map((name, i) => (
                    <TouchableOpacity
                        key={i}
                        style={[styles.athleteChip, selectedAthlete === name && styles.athleteChipSelected]}
                        onPress={() => setSelectedAthlete(name)}
                    >
                        <User size={16} color={selectedAthlete === name ? Colors.light.background : Colors.light.text} />
                        <Text style={[styles.chipText, selectedAthlete === name && styles.chipTextSelected]}>{name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderWorkoutBuilder = () => (
        <View style={styles.builderContainer}>
            <Text style={styles.stepTitle}>2. Build Session</Text>

            <TouchableOpacity style={styles.addExerciseButton}>
                <Plus size={24} color={Colors.light.primary} />
                <Text style={styles.addExerciseText}>Add Exercise</Text>
            </TouchableOpacity>

            <View style={styles.exerciseList}>
                <View style={styles.exerciseItem}>
                    <View style={styles.exerciseHeader}>
                        <Dumbbell size={20} color={Colors.light.text} />
                        <Text style={styles.exerciseName}>Back Squat</Text>
                    </View>
                    <View style={styles.setRow}>
                        <Text style={styles.setText}>Set 1</Text>
                        <TextInput style={styles.weightInput} placeholder="100" placeholderTextColor={Colors.light.mutedForeground} />
                        <Text style={styles.unitText}>kg</Text>
                        <TextInput style={styles.repsInput} placeholder="5" placeholderTextColor={Colors.light.mutedForeground} />
                        <Text style={styles.unitText}>reps</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.startButton} onPress={() => alert('Starting live session...')}>
                <Text style={styles.startButtonText}>Start Live Session</Text>
                <ChevronRight size={20} color={Colors.light.primaryForeground} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Quick Log</Text>
                <Text style={styles.subtitle}>Log a session on the floor</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {renderAthleteSelector()}
                {selectedAthlete && renderWorkoutBuilder()}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    header: {
        padding: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.light.text,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.light.mutedForeground,
    },
    content: {
        padding: 24,
        gap: 32,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 16,
    },
    selectorContainer: {
        gap: 12,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.input,
        padding: 12,
        borderRadius: 12,
        gap: 12,
    },
    input: {
        flex: 1,
        color: Colors.light.text,
        fontSize: 16,
    },
    recentList: {
        flexDirection: 'row',
    },
    athleteChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.card,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 8,
        gap: 8,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    athleteChipSelected: {
        backgroundColor: Colors.light.tint,
        borderColor: Colors.light.tint,
    },
    chipText: {
        color: Colors.light.text,
        fontWeight: '500',
    },
    chipTextSelected: {
        color: Colors.light.background,
    },
    builderContainer: {
        gap: 16,
    },
    addExerciseButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderWidth: 2,
        borderColor: Colors.light.border,
        borderStyle: 'dashed',
        borderRadius: 16,
        gap: 8,
        marginBottom: 16,
    },
    addExerciseText: {
        color: Colors.light.primary,
        fontWeight: '600',
        fontSize: 16,
    },
    exerciseList: {
        gap: 16,
    },
    exerciseItem: {
        backgroundColor: Colors.light.card,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    exerciseHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.light.text,
    },
    setRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    setText: {
        color: Colors.light.mutedForeground,
        width: 40,
    },
    weightInput: {
        backgroundColor: Colors.light.input,
        color: Colors.light.text,
        padding: 8,
        borderRadius: 8,
        width: 60,
        textAlign: 'center',
    },
    repsInput: {
        backgroundColor: Colors.light.input,
        color: Colors.light.text,
        padding: 8,
        borderRadius: 8,
        width: 60,
        textAlign: 'center',
    },
    unitText: {
        color: Colors.light.mutedForeground,
        fontSize: 12,
    },
    startButton: {
        backgroundColor: Colors.light.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 16,
        marginTop: 16,
        gap: 8,
    },
    startButtonText: {
        color: Colors.light.primaryForeground,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
