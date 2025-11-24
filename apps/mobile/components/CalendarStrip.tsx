import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';

interface CalendarStripProps {
    onDateSelect: (date: Date) => void;
    selectedDate: Date;
}

export function CalendarStrip({ onDateSelect, selectedDate }: CalendarStripProps) {
    // Generate next 7 days for demo
    const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return d;
    });

    const isSelected = (date: Date) => {
        return date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth();
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {dates.map((date, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.dateItem,
                            isSelected(date) && styles.dateItemSelected
                        ]}
                        onPress={() => onDateSelect(date)}
                    >
                        <Text style={[styles.dayName, isSelected(date) && styles.textSelected]}>
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </Text>
                        <Text style={[styles.dayNumber, isSelected(date) && styles.textSelected]}>
                            {date.getDate()}
                        </Text>
                        {index === 0 && <View style={styles.dot} />}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    scrollContent: {
        paddingHorizontal: 24,
        gap: 12,
    },
    dateItem: {
        width: 50,
        height: 70,
        borderRadius: 25,
        backgroundColor: Colors.dark.card,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    dateItemSelected: {
        backgroundColor: Colors.dark.tint,
        borderColor: Colors.dark.tint,
    },
    dayName: {
        fontSize: 12,
        color: Colors.dark.mutedForeground,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    dayNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.dark.text,
    },
    textSelected: {
        color: Colors.dark.background,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.dark.tint,
        position: 'absolute',
        bottom: 8,
    },
});
