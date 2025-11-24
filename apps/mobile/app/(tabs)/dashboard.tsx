import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Stack, useRouter } from 'expo-router';
import { Users, Activity, BarChart3, ArrowRight } from 'lucide-react-native';
import { ExpandableCard } from '../../components/ExpandableCard';
import { MetricPill } from '../../components/MetricPill';

export default function Dashboard() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Good Morning,</Text>
                        <Text style={styles.name}>Jan Schurch</Text>
                    </View>
                    <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/(tabs)/profile')}>
                        <Users color={Colors.light.text} size={24} />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>At a Glance</Text>

                    <ExpandableCard
                        title="Recovery"
                        summary={<Text style={{ color: '#22c55e', fontWeight: 'bold' }}>92% - Prime</Text>}
                        icon={<Activity size={20} color="#22c55e" />}
                    >
                        <View style={styles.cardContent}>
                            <View style={styles.metricRow}>
                                <Text style={styles.metricLabel}>HRV</Text>
                                <MetricPill label="ms" value="42" color="#22c55e" />
                            </View>
                            <View style={styles.metricRow}>
                                <Text style={styles.metricLabel}>Sleep</Text>
                                <MetricPill label="hrs" value="8.2" color="#22c55e" />
                            </View>
                        </View>
                    </ExpandableCard>

                    <ExpandableCard
                        title="Weekly Volume"
                        summary="12,450 kg"
                        icon={<BarChart3 size={20} color={Colors.light.primary} />}
                    >
                        <View style={styles.cardContent}>
                            <View style={styles.metricRow}>
                                <Text style={styles.metricLabel}>Squat</Text>
                                <Text style={styles.metricValue}>4,200 kg</Text>
                            </View>
                            <View style={styles.metricRow}>
                                <Text style={styles.metricLabel}>Bench</Text>
                                <Text style={styles.metricValue}>3,100 kg</Text>
                            </View>
                            <View style={styles.metricRow}>
                                <Text style={styles.metricLabel}>Deadlift</Text>
                                <Text style={styles.metricValue}>5,150 kg</Text>
                            </View>
                        </View>
                    </ExpandableCard>
                </View>

                <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/(tabs)/plan')}>
                    <View>
                        <Text style={styles.ctaTitle}>Today's Workout</Text>
                        <Text style={styles.ctaSubtitle}>Upper Body Power • 45m</Text>
                    </View>
                    <ArrowRight color={Colors.light.primaryForeground} size={24} />
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
        marginBottom: 4,
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
    metricRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metricLabel: {
        color: Colors.light.mutedForeground,
        fontSize: 14,
    },
    metricValue: {
        color: Colors.light.text,
        fontSize: 14,
        fontWeight: '600',
    },
    ctaButton: {
        backgroundColor: Colors.light.primary,
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ctaTitle: {
        color: Colors.light.primaryForeground,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    ctaSubtitle: {
        color: Colors.light.primaryForeground,
        opacity: 0.8,
        fontSize: 14,
    },
});
