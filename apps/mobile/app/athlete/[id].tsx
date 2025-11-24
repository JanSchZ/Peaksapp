import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Colors } from '../../constants/Colors';
import { ArrowLeft, MessageSquare, Calendar, Activity, ChevronRight } from 'lucide-react-native';
import { MetricPill } from '../../components/MetricPill';
import { ExpandableCard } from '../../components/ExpandableCard';

export default function AthleteDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const { data: athlete, isLoading } = useQuery({
        queryKey: ['athlete', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            // Mock metrics for now as they might come from a different table/calculation
            return {
                ...data,
                name: data.full_name || 'Unknown Athlete',
                status: 'Training Now', // This would need real-time logic
                statusColor: '#22c55e',
                metrics: {
                    readiness: 'High',
                    load: 'High',
                    compliance: '92%'
                }
            };
        }
    });

    if (isLoading || !athlete) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={[styles.content, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                    <Text>Loading athlete profile...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft color={Colors.light.text} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Athlete Profile</Text>
                <TouchableOpacity onPress={() => { }}>
                    <MessageSquare color={Colors.light.text} size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{athlete.name.split(' ').map((n: string) => n[0]).join('')}</Text>
                    </View>
                    <Text style={styles.name}>{athlete.name}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: athlete.statusColor + '20' }]}>
                        <View style={[styles.statusDot, { backgroundColor: athlete.statusColor }]} />
                        <Text style={[styles.statusText, { color: athlete.statusColor }]}>{athlete.status}</Text>
                    </View>
                </View>

                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Readiness</Text>
                        <Text style={styles.statValue}>{athlete.metrics.readiness}</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Load</Text>
                        <Text style={styles.statValue}>{athlete.metrics.load}</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Compliance</Text>
                        <Text style={styles.statValue}>{athlete.metrics.compliance}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    <ExpandableCard
                        title="Upper Body Power"
                        summary="Yesterday • Completed"
                        icon={<Activity size={20} color={Colors.light.primary} />}
                    >
                        <View style={styles.activityContent}>
                            <View style={styles.metricRow}>
                                <MetricPill label="Volume" value="4,200 kg" />
                                <MetricPill label="Intensity" value="8/10" />
                            </View>
                            <Text style={styles.notes}>"Felt strong on the bench press today. Added 2.5kg."</Text>
                        </View>
                    </ExpandableCard>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Upcoming</Text>
                    <TouchableOpacity style={styles.upcomingCard}>
                        <View style={styles.upcomingLeft}>
                            <Calendar size={20} color={Colors.light.mutedForeground} />
                            <View>
                                <Text style={styles.upcomingTitle}>Lower Body Strength</Text>
                                <Text style={styles.upcomingSubtitle}>Tomorrow • Squat Focus</Text>
                            </View>
                        </View>
                        <ChevronRight size={20} color={Colors.light.mutedForeground} />
                    </TouchableOpacity>
                </View>
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
    profileHeader: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.light.muted,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: '600',
        color: Colors.light.text,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 8,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    statCard: {
        flex: 1,
        backgroundColor: Colors.light.card,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.light.border,
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 12,
        color: Colors.light.mutedForeground,
        marginBottom: 4,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 16,
    },
    activityContent: {
        gap: 12,
    },
    metricRow: {
        flexDirection: 'row',
        gap: 8,
    },
    notes: {
        fontSize: 14,
        color: Colors.light.mutedForeground,
        fontStyle: 'italic',
    },
    upcomingCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.light.card,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    upcomingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    upcomingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    upcomingSubtitle: {
        fontSize: 14,
        color: Colors.light.mutedForeground,
    },
});
