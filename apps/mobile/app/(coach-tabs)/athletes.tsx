import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { Colors } from '../../constants/Colors';
import { AthleteCard } from '../../components/AthleteCard';
import { Search } from 'lucide-react-native';

import { useRouter } from 'expo-router';

export default function AthletesScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const athletes = [
        { id: '1', name: 'Sarah Jenkins', status: 'Training Now', statusColor: '#22c55e', lastActive: 'Active' },
        { id: '2', name: 'Mike Thompson', status: 'Rest Day', statusColor: Colors.light.mutedForeground, lastActive: '2h ago' },
        { id: '3', name: 'Tom Baker', status: 'Injured', statusColor: '#ef4444', lastActive: '1d ago' },
        { id: '4', name: 'Emily Chen', status: 'Scheduled', statusColor: '#3b82f6', lastActive: '5h ago' },
        { id: '5', name: 'David Wilson', status: 'Completed', statusColor: '#22c55e', lastActive: '30m ago' },
    ];

    const filteredAthletes = athletes.filter(athlete =>
        athlete.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Athletes</Text>
                <View style={styles.searchContainer}>
                    <Search size={20} color={Colors.light.mutedForeground} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search athletes..."
                        placeholderTextColor={Colors.light.mutedForeground}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>All Athletes ({filteredAthletes.length})</Text>
                {filteredAthletes.map(athlete => (
                    <AthleteCard
                        key={athlete.id}
                        name={athlete.name}
                        status={athlete.status}
                        statusColor={athlete.statusColor}
                        lastActive={athlete.lastActive}
                        onPress={() => router.push(`/athlete/${athlete.id}`)}
                    />
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
        padding: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.light.text,
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.input,
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 12,
        color: Colors.light.text,
        fontSize: 16,
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
});
