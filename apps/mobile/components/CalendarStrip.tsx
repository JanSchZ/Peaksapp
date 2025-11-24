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
                            styles.dayItem,
                            isSelected(date) && styles.dayItemSelected
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
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 12,
    },
    dayItem: {
        width: 50,
        height: 70,
        borderRadius: 25,
        backgroundColor: Colors.light.card,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    dayItemSelected: {
        backgroundColor: Colors.light.tint,
        borderColor: Colors.light.tint,
    },
    dayName: {
        fontSize: 12,
        color: Colors.light.mutedForeground,
        marginBottom: 4,
        fontWeight: '500',
    },
    dayNumber: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
    },
    textSelected: {
        color: Colors.light.background,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.light.tint,
        position: 'absolute',
        bottom: 8,
    },
});
