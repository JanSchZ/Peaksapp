import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { useUser } from '../context/UserContext';
import { ArrowLeft, UserCog } from 'lucide-react-native';

export default function SettingsScreen() {
    const router = useRouter();
    const { userType, toggleUserType } = useUser();

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft color={Colors.light.text} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 32 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>

                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <UserCog size={20} color={Colors.light.text} />
                            <Text style={styles.rowLabel}>Coach Mode</Text>
                        </View>
                        <Switch
                            value={userType === 'coach'}
                            onValueChange={toggleUserType}
                            trackColor={{ false: Colors.light.input, true: Colors.light.tint }}
                            thumbColor={Colors.light.background}
                        />
                    </View>
                    <Text style={styles.helperText}>
                        Enable this to access coaching tools and manage athletes.
                    </Text>
                </View>
            </View>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.light.text,
    },
    content: {
        padding: 24,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.mutedForeground,
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.light.card,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
        marginBottom: 8,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    rowLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.light.text,
    },
    helperText: {
        fontSize: 13,
        color: Colors.light.mutedForeground,
        marginLeft: 4,
    },
});
