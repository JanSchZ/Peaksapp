import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Stack, useRouter } from 'expo-router';
import { Users, Calendar, Plus } from 'lucide-react-native';

export default function CoachDashboard() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.greeting}>Coach Mode</Text>
                    <Text style={styles.name}>Command Center</Text>
                </View>

                <View style={styles.grid}>
                    <TouchableOpacity style={styles.card}>
                        <View style={styles.iconContainer}>
                            {/* @ts-ignore */}
                            <Users color={Colors.dark.primary} size={24} />
                        </View>
                        <Text style={styles.cardTitle}>Athletes</Text>
                        <Text style={styles.cardStat}>24 Active</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <View style={styles.iconContainer}>
                            {/* @ts-ignore */}
                            <Calendar color={Colors.dark.primary} size={24} />
                        </View>
                        <Text style={styles.cardTitle}>Schedule</Text>
                        <Text style={styles.cardStat}>3 Sessions Today</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            {/* @ts-ignore */}
                            <Plus color={Colors.dark.text} size={20} />
                        </View>
                        <View>
                            <Text style={styles.actionTitle}>Log Session for Athlete</Text>
                            <Text style={styles.actionDesc}>Record a workout on the fly</Text>
                        </View>
                    </TouchableOpacity>
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
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: '600',
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.dark.text,
    },
    grid: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 32,
    },
    card: {
        flex: 1,
        backgroundColor: Colors.dark.card,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: Colors.dark.accent,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.dark.text,
        marginBottom: 4,
    },
    cardStat: {
        fontSize: 12,
        color: Colors.dark.mutedForeground,
    },
    section: {
        gap: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.dark.text,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.dark.card,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.dark.border,
        gap: 16,
    },
    actionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.dark.primary, // Zinc 50
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.dark.text,
    },
    actionDesc: {
        fontSize: 12,
        color: Colors.dark.mutedForeground,
    },
});
