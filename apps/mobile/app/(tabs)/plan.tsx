import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { CalendarStrip } from '../../components/CalendarStrip';
import { ExpandableCard } from '../../components/ExpandableCard';
import { MetricPill } from '../../components/MetricPill';
import { Dumbbell, Clock, Target } from 'lucide-react-native';

export default function PlanScreen() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Training Plan</Text>
            </View>

            <CalendarStrip
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
            />

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>
                    {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </Text>

                <ExpandableCard
                    title="Upper Body Power"
                    summary="45 min • Hypertrophy"
                    icon={<Dumbbell size={20} color={Colors.dark.text} />}
                >
                    <View style={styles.cardContent}>
                        <View style={styles.metricsRow}>
                            <MetricPill label="Volume" value="8,400 kg" color={Colors.dark.tint} />
                            <MetricPill label="Intensity" value="High" color="#ef4444" />
                        </View>

                        <View style={styles.exerciseList}>
                            <View style={styles.exerciseItem}>
                                <Text style={styles.exerciseName}>Bench Press</Text>
                                <Text style={styles.exerciseDetails}>4 sets x 6-8 reps @ 85kg</Text>
                            </View>
                            <View style={styles.exerciseItem}>
                                <Text style={styles.exerciseName}>Pull Ups</Text>
                                <Text style={styles.exerciseDetails}>3 sets x 10 reps @ BW</Text>
                            </View>
                            <View style={styles.exerciseItem}>
                                <Text style={styles.exerciseName}>Overhead Press</Text>
                                <Text style={styles.exerciseDetails}>3 sets x 8-10 reps @ 50kg</Text>
                            </View>
                        </View>
                    </View>
                </ExpandableCard>

                <ExpandableCard
                    title="Zone 2 Cardio"
                    summary="30 min • Recovery"
                    icon={<Clock size={20} color={Colors.dark.text} />}
                >
                    <View style={styles.cardContent}>
                        <Text style={styles.cardText}>
                            Steady state cardio to improve aerobic base and recovery. Keep heart rate between 130-140 bpm.
                        </Text>
                        <View style={styles.metricsRow}>
                            <MetricPill label="Target HR" value="135 bpm" color="#3b82f6" />
                        </View>
                    </View>
                </ExpandableCard>
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
        padding: 24,
        paddingBottom: 0,
    },
    content: {
        padding: 24,
        paddingTop: 0,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.dark.text,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.dark.text,
        marginBottom: 16,
    },
    cardContent: {
        gap: 16,
    },
    cardText: {
        color: Colors.dark.mutedForeground,
        lineHeight: 22,
    },
    metricsRow: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
    },
    exerciseList: {
        gap: 12,
        marginTop: 8,
    },
    exerciseItem: {
        padding: 12,
        backgroundColor: Colors.dark.background,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.dark.text,
        marginBottom: 2,
    },
    exerciseDetails: {
        fontSize: 14,
        color: Colors.dark.mutedForeground,
    },
});
