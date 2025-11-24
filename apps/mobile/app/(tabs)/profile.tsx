import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Settings, ChevronRight, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../../context/UserContext';

export default function Profile() {
    const router = useRouter();
    const { userType } = useUser();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
                <TouchableOpacity onPress={() => router.push('/settings')}>
                    <Settings color={Colors.light.text} size={24} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>JD</Text>
                    </View>
                    <View>
                        <Text style={styles.name}>John Doe</Text>
                        <Text style={styles.role}>{userType === 'coach' ? 'Coach' : 'Athlete'}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings')}>
                        <Text style={styles.menuText}>Settings</Text>
                        <ChevronRight size={20} color={Colors.light.mutedForeground} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutButton}>
                    <LogOut size={20} color="#ef4444" />
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>
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
    content: {
        padding: 24,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
        gap: 16,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.light.muted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.light.text,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.light.text,
    },
    role: {
        fontSize: 14,
        color: Colors.light.mutedForeground,
        textTransform: 'capitalize',
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.mutedForeground,
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    menuText: {
        fontSize: 16,
        color: Colors.light.text,
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 'auto',
    },
    logoutText: {
        color: '#ef4444',
        fontSize: 16,
        fontWeight: '600',
    },
});
