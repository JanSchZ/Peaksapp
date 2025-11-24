import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Calendar, ChevronRight, Dumbbell } from 'lucide-react-native';

export default function LogScreen() {
    const history = [
        { id: '1', name: 'Upper Body Power', date: 'Today, 10:00 AM', duration: '45m', volume: '4,200kg' },
        { id: '2', name: 'Zone 2 Run', date: 'Yesterday, 6:30 AM', duration: '60m', volume: '8km' },
        { id: '3', name: 'Lower Body Strength', date: 'Mon, Oct 23', duration: '55m', volume: '6,100kg' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Log</Text>
                <TouchableOpacity style={styles.logButton}>
                    <Text style={styles.logButtonText}>+ Log Workout</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Recent History</Text>
                {history.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.historyItem}>
                        <View style={styles.iconContainer}>
                            <Dumbbell size={20} color={Colors.light.primary} />
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <View style={styles.itemMeta}>
                                <Calendar size={12} color={Colors.light.mutedForeground} />
                                <Text style={styles.itemDate}>{item.date}</Text>
                                <Text style={styles.itemDot}>•</Text>
                                <Text style={styles.itemDate}>{item.duration}</Text>
                            </View>
                        </View>
                        <ChevronRight size={20} color={Colors.light.mutedForeground} />
                    </TouchableOpacity>
                ))}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.light.text,
    },
    logButton: {
        backgroundColor: Colors.light.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    logButtonText: {
        color: Colors.light.primaryForeground,
        fontWeight: '600',
        fontSize: 14,
    },
    content: {
        padding: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.mutedForeground,
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.card,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.light.muted,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    itemContent: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 4,
    },
    itemMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    itemDate: {
        fontSize: 12,
        color: Colors.light.mutedForeground,
    },
    itemDot: {
        fontSize: 12,
        color: Colors.light.mutedForeground,
        marginHorizontal: 4,
    },
});
