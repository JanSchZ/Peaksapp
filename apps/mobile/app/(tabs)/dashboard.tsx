import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Stack, useRouter } from 'expo-router';
import { useTodaysWorkout } from '../../hooks/useTodaysWorkout';
import { WorkoutCard } from '../../components/WorkoutCard';

export default function Dashboard() {
    const { data: workout, isLoading } = useTodaysWorkout();
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.greeting}>Good Morning,</Text>
                    <Text style={styles.name}>Athlete</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Today's Workout</Text>
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
                        <Text style={styles.emptyText}>No workout scheduled for today.</Text>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Weekly Progress</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>4</Text>
                            <Text style={styles.statLabel}>Sessions</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>92%</Text>
                            <Text style={styles.statLabel}>Compliance</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>12k</Text>
                            <Text style={styles.statLabel}>Volume</Text>
                        </View>
                    </View>
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
    },
    header: {
        marginBottom: 32,
    },
    greeting: {
        fontSize: 16,
        color: Colors.dark.mutedForeground,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
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
    emptyText: {
        color: Colors.dark.mutedForeground,
        fontStyle: 'italic',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: Colors.dark.card,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.dark.border,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.dark.text,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.dark.mutedForeground,
    },
});
