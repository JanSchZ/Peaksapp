import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { ArrowLeft, Clock, Check, Dumbbell } from 'lucide-react-native';
import { ExpandableCard } from '../../components/ExpandableCard';
import { CommentSection } from '../../components/CommentSection';

export default function WorkoutDetail() {
    const router = useRouter();
    const [notes, setNotes] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft color={Colors.light.text} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Upper Body Power</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.metaContainer}>
                    <View style={styles.metaItem}>
                        <Clock size={16} color={Colors.light.mutedForeground} />
                        <Text style={styles.metaText}>45 min</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Dumbbell size={16} color={Colors.light.mutedForeground} />
                        <Text style={styles.metaText}>4,200 kg</Text>
                    </View>
                </View>

                <View style={styles.exercises}>
                    <ExpandableCard
                        title="Bench Press"
                        summary="3 sets • 8-10 reps"
                        icon={<Dumbbell size={20} color={Colors.light.primary} />}
                    >
                        <View style={styles.setList}>
                            {[1, 2, 3].map((set) => (
                                <View key={set} style={styles.setRow}>
                                    <Text style={styles.setLabel}>Set {set}</Text>
                                    <View style={styles.inputs}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="kg"
                                            placeholderTextColor={Colors.light.mutedForeground}
                                            keyboardType="numeric"
                                        />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="reps"
                                            placeholderTextColor={Colors.light.mutedForeground}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.checkButton}>
                                        <Check size={16} color={Colors.light.background} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </ExpandableCard>

                    <ExpandableCard
                        title="Pull Ups"
                        summary="3 sets • AMRAP"
                        icon={<Dumbbell size={20} color={Colors.light.primary} />}
                    >
                        <View style={styles.setList}>
                            {[1, 2, 3].map((set) => (
                                <View key={set} style={styles.setRow}>
                                    <Text style={styles.setLabel}>Set {set}</Text>
                                    <View style={styles.inputs}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="bw"
                                            placeholderTextColor={Colors.light.mutedForeground}
                                            keyboardType="numeric"
                                        />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="reps"
                                            placeholderTextColor={Colors.light.mutedForeground}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.checkButton}>
                                        <Check size={16} color={Colors.light.background} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </ExpandableCard>
                </View>

                <View style={styles.notesSection}>
                    <Text style={styles.sectionTitle}>Session Notes</Text>
                    <TextInput
                        style={styles.notesInput}
                        placeholder="How did it feel?"
                        placeholderTextColor={Colors.light.mutedForeground}
                        multiline
                        value={notes}
                        onChangeText={setNotes}
                    />
                </View>

                <CommentSection />

                <TouchableOpacity style={styles.finishButton} onPress={() => router.back()}>
                    <Text style={styles.finishButtonText}>Finish Workout</Text>
                </TouchableOpacity>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.light.text,
    },
    content: {
        padding: 24,
    },
    metaContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: Colors.light.muted,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    metaText: {
        color: Colors.light.mutedForeground,
        fontSize: 14,
        fontWeight: '500',
    },
    exercises: {
        gap: 16,
        marginBottom: 32,
    },
    setList: {
        gap: 12,
    },
    setRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    setLabel: {
        color: Colors.light.mutedForeground,
        fontSize: 14,
        width: 40,
    },
    inputs: {
        flex: 1,
        flexDirection: 'row',
        gap: 12,
    },
    input: {
        flex: 1,
        backgroundColor: Colors.light.input,
        borderRadius: 8,
        padding: 8,
        color: Colors.light.text,
        textAlign: 'center',
    },
    checkButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.light.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notesSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 12,
    },
    notesInput: {
        backgroundColor: Colors.light.card,
        borderRadius: 12,
        padding: 16,
        color: Colors.light.text,
        minHeight: 100,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    finishButton: {
        backgroundColor: Colors.light.primary,
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 32,
    },
    finishButtonText: {
        color: Colors.light.primaryForeground,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
