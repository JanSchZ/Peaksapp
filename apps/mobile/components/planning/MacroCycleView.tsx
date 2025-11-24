import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { ZoomIn } from 'lucide-react-native';

interface MacroCycleViewProps {
    onSelectWeek: (week: number) => void;
}

export function MacroCycleView({ onSelectWeek }: MacroCycleViewProps) {
    const weeks = [1, 2, 3, 4]; // Mock 4-week mesocycle

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesocycle 1 • Hypertrophy</Text>
                <Text style={styles.subtitle}>Macro View</Text>
            </View>

            <ScrollView contentContainerStyle={styles.grid}>
                {weeks.map((week) => (
                    <TouchableOpacity
                        key={week}
                        style={styles.weekCard}
                        onPress={() => onSelectWeek(week)}
                    >
                        <View style={styles.weekHeader}>
                            <Text style={styles.weekTitle}>Week {week}</Text>
                            <ZoomIn size={16} color={Colors.light.mutedForeground} />
                        </View>

                        <View style={styles.miniDays}>
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((_, i) => (
                                <View key={i} style={[
                                    styles.miniDay,
                                    // Mock: Highlight training days (M, W, F, S)
                                    [0, 2, 4, 5].includes(i) && styles.trainingDay
                                ]} />
                            ))}
                        </View>

                        <View style={styles.stats}>
                            <Text style={styles.statText}>Volume: High</Text>
                            <Text style={styles.statText}>Int: Mod</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        padding: 16,
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.light.mutedForeground,
        marginTop: 4,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    weekCard: {
        width: '47%', // Roughly 2 columns
        backgroundColor: Colors.light.card,
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
        aspectRatio: 1,
    },
    weekHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    weekTitle: {
        fontWeight: '600',
        color: Colors.light.text,
    },
    miniDays: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    miniDay: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.light.border,
    },
    trainingDay: {
        backgroundColor: Colors.light.primary,
    },
    stats: {
        marginTop: 'auto',
    },
    statText: {
        fontSize: 10,
        color: Colors.light.mutedForeground,
    },
});
