import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Stack } from 'expo-router';

export default function Dashboard() {
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
                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Lower Body Power</Text>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>60 MIN</Text>
                            </View>
                        </View>
                        <Text style={styles.cardDescription}>Squat Focus • Week 3</Text>
                        <View style={styles.separator} />
                        <Text style={styles.cardFooter}>Tap to start session</Text>
                    </TouchableOpacity>
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
    card: {
        backgroundColor: Colors.dark.card,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.dark.text,
    },
    cardDescription: {
        fontSize: 14,
        color: Colors.dark.mutedForeground,
    },
    badge: {
        backgroundColor: Colors.dark.accent,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: {
        color: Colors.dark.text,
        fontSize: 12,
        fontWeight: '600',
    },
    separator: {
        height: 1,
        backgroundColor: Colors.dark.border,
        marginVertical: 16,
    },
    cardFooter: {
        color: Colors.dark.primary,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
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
