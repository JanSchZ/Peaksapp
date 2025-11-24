import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Stack, useRouter } from 'expo-router';
import { Users, AlertTriangle, Activity, ArrowRight, Calendar } from 'lucide-react-native';
import { ExpandableCard } from '../../components/ExpandableCard';
import { MetricPill } from '../../components/MetricPill';

export default function CoachDashboard() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Coach Mode</Text>
                        <Text style={styles.name}>Command Center</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/planning/editor')}>
                            <Calendar color={Colors.light.text} size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/(tabs)/profile')}>
                            <Users color={Colors.light.text} size={24} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Action Required</Text>

                    <ExpandableCard
                        title="Missed Workouts"
                        summary={<Text style={{ color: '#ef4444', fontWeight: 'bold' }}>3 Athletes</Text>}
                        icon={<AlertTriangle size={20} color="#ef4444" />}
                    >
                        <View style={styles.cardContent}>
                            <TouchableOpacity style={styles.alertItem}>
                                <Text style={styles.alertText}>Sarah J. - Missed "Leg Power"</Text>
                                <ArrowRight size={16} color={Colors.light.mutedForeground} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.alertItem}>
                                <Text style={styles.alertText}>Mike T. - Missed "Recovery Run"</Text>
                                <ArrowRight size={16} color={Colors.light.mutedForeground} />
                            </TouchableOpacity>
                        </View>
                    </ExpandableCard>

                    <ExpandableCard
                        title="Low Readiness"
                        summary={<Text style={{ color: '#fbbf24', fontWeight: 'bold' }}>2 Athletes</Text>}
                        icon={<Activity size={20} color="#fbbf24" />}
                    >
                        <View style={styles.cardContent}>
                            <View style={styles.alertItem}>
                                <Text style={styles.alertText}>Tom B. - HRV dropped 20%</Text>
                                <MetricPill label="HRV" value="32ms" color="#fbbf24" />
                            </View>
                        </View>
                    </ExpandableCard>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Live Now</Text>
                    <View style={styles.liveCard}>
                        <View style={styles.liveHeader}>
                            <View style={styles.liveIndicator} />
                            <Text style={styles.liveTitle}>Training Currently</Text>
                        </View>
                        <View style={styles.athleteRow}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>JD</Text>
                            </View>
                            <View style={styles.athleteInfo}>
                                <Text style={styles.athleteName}>John Doe</Text>
                                <Text style={styles.athleteStatus}>Squatting Heavy • Set 3/5</Text>
                            </View>
                            <TouchableOpacity style={styles.joinButton} onPress={() => router.push('/(coach-tabs)/session')}>
                                <Text style={styles.joinButtonText}>View</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    content: {
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    greeting: {
        fontSize: 16,
        color: Colors.light.mutedForeground,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: '600',
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    profileButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.light.card,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 16,
    },
    cardContent: {
        gap: 12,
    },
    alertItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    alertText: {
        color: Colors.light.text,
        fontSize: 14,
    },
    liveCard: {
        backgroundColor: Colors.light.card,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    liveHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    liveIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#22c55e',
    },
    liveTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#22c55e',
        textTransform: 'uppercase',
    },
    athleteRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.light.muted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: Colors.light.text,
        fontWeight: '600',
    },
    athleteInfo: {
        flex: 1,
    },
    athleteName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    athleteStatus: {
        fontSize: 12,
        color: Colors.light.mutedForeground,
    },
    joinButton: {
        backgroundColor: Colors.light.input,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    joinButtonText: {
        color: Colors.light.text,
        fontSize: 12,
        fontWeight: '600',
    },
});
