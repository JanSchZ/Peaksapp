import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface MetricPillProps {
    label: string;
    value: string;
    color?: string;
}

export function MetricPill({ label, value, color = Colors.light.tint }: MetricPillProps) {
    return (
        <View style={[styles.container, { borderColor: color }]}>
            <Text style={[styles.label, { color: color }]}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: Colors.light.muted,
        alignSelf: 'flex-start',
    },
    label: {
        fontSize: 12,
        color: Colors.light.mutedForeground,
        marginBottom: 2,
        fontWeight: '500',
    },
    value: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.light.text,
    },
});
