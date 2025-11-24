import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';

interface WorkoutCardProps {
    title: string;
    duration: number;
    focus: string;
    week: number;
    onPress: () => void;
}

export function WorkoutCard({ title, duration, focus, week, onPress }: WorkoutCardProps) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{title}</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{duration} MIN</Text>
                </View>
            </View>
            <Text style={styles.cardDescription}>{focus} • Week {week}</Text>
            <View style={styles.separator} />
            <Text style={styles.cardFooter}>Tap to start session</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.light.card,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.light.border,
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
        color: Colors.light.text,
    },
    cardDescription: {
        fontSize: 14,
        color: Colors.light.mutedForeground,
    },
    badge: {
        backgroundColor: Colors.light.accent,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: {
        color: Colors.light.text,
        fontSize: 12,
        fontWeight: '600',
    },
    separator: {
        height: 1,
        backgroundColor: Colors.light.border,
        marginVertical: 16,
    },
    cardFooter: {
        color: Colors.light.primary,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});
