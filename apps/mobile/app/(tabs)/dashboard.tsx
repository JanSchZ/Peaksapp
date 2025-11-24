import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Stack, useRouter } from 'expo-router';
import { useTodaysWorkout } from '../../hooks/useTodaysWorkout';
import { WorkoutCard } from '../../components/WorkoutCard';
import { ExpandableCard } from '../../components/ExpandableCard';
import { MetricPill } from '../../components/MetricPill';
import { Activity, Heart, Zap, TrendingUp } from 'lucide-react-native';

export default function Dashboard() {
    const { data: workout, isLoading } = useTodaysWorkout();
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Good Morning,</Text>
                        <Text style={styles.name}>Athlete</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <MetricPill label="Strain" value="14.2" color={Colors.dark.tint} />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>At a Glance</Text>

                    <ExpandableCard
                        title="Recovery"
                        summary={<Text style={{ color: '#4ade80', fontWeight: 'bold' }}>92% - Prime to Perform</Text>}
                        icon={<Zap size={20} color={Colors.dark.text} />}
                    >
                        <View style={styles.cardContent}>
                            <Text style={styles.cardText}>
                                Your HRV is significantly higher than your baseline. You are well recovered and ready to take on high strain today.
                            </Text>
                            <View style={styles.metricsRow}>
                                <MetricPill label="HRV" value="112 ms" color="#4ade80" />
                                <MetricPill label="RHR" value="42 bpm" color="#4ade80" />
                                <MetricPill label="Sleep" value="7h 42m" color="#fbbf24" />
                            </View>
                        </View>
                    </ExpandableCard>

                    <ExpandableCard
                        title="Weekly Volume"
                        summary="12,450 kg lifted"
                        icon={<TrendingUp size={20} color={Colors.dark.text} />}
                    >
                        <View style={styles.cardContent}>
                            <Text style={styles.cardText}>
                                You are on track to beat your weekly volume goal. Keep pushing!
                            </Text>
                            <View style={styles.metricsRow}>
                                <MetricPill label="Sets" value="42" color={Colors.dark.tint} />
                                <MetricPill label="Reps" value="340" color={Colors.dark.tint} />
                            </View>
                        </View>
                    </ExpandableCard>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Today's Training</Text>
                    {isLoading ? (
                        <ActivityIndicator color={Colors.dark.primary} />
                    ) : workout ? (
                        <WorkoutCard
                            title={workout.title}
                            duration={workout.duration}
                            focus={workout.focus}
                            week={workout.week}
                            onPress={() => router.push(`/workout/${workout.id}`)}
                        />
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>Rest Day</Text>
                            <Text style={styles.emptySubtext}>Take it easy and recover.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    content: {
        padding: 24,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    headerRight: {
        justifyContent: 'center',
    },
    greeting: {
        fontSize: 16,
        color: Colors.dark.mutedForeground,
    },
    name: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.dark.text,
    },
    section: {
        marginBottom: 32,
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
    emptyState: {
        padding: 24,
        backgroundColor: Colors.dark.card,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.dark.border,
        borderStyle: 'dashed',
    },
    emptyText: {
        color: Colors.dark.text,
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    emptySubtext: {
        color: Colors.dark.mutedForeground,
    },
});
