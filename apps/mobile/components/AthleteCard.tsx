import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../constants/Colors';
import { ChevronRight } from 'lucide-react-native';

interface AthleteCardProps {
    name: string;
    status: string;
    statusColor?: string;
    lastActive: string;
    onPress: () => void;
}

export function AthleteCard({ name, status, statusColor = Colors.light.mutedForeground, lastActive, onPress }: AthleteCardProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{name.split(' ').map(n => n[0]).join('')}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.statusRow}>
                    <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                    <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
                    <Text style={styles.separator}>•</Text>
                    <Text style={styles.lastActive}>{lastActive}</Text>
                </View>
            </View>
            <ChevronRight size={20} color={Colors.light.mutedForeground} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: Colors.light.card,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.light.muted,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    avatarText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    content: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 4,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },
    separator: {
        marginHorizontal: 6,
        color: Colors.light.mutedForeground,
        fontSize: 12,
    },
    lastActive: {
        fontSize: 12,
        color: Colors.light.mutedForeground,
    },
});
