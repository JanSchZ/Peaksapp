import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface MetricPillProps {
    label: string;
    value: string;
    color?: string;
}

export function MetricPill({ label, value, color = Colors.dark.tint }: MetricPillProps) {
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
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 80,
    },
    label: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    value: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.dark.text,
    },
});
