import React, { useState } from 'react';
import { Alert, StyleSheet, View, TextInput, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { supabase } from '../lib/supabase';
import { router } from 'expo-router';
import { Colors } from '../constants/Colors';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        else router.replace('/(tabs)/dashboard');
        setLoading(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>PEAKS</Text>
                    <Text style={styles.subtitle}>High Performance OS</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            placeholder="athlete@peaks.com"
                            placeholderTextColor={Colors.light.mutedForeground}
                            autoCapitalize={'none'}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry={true}
                            placeholder="••••••••"
                            placeholderTextColor={Colors.light.mutedForeground}
                            autoCapitalize={'none'}
                            style={styles.input}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={() => signInWithEmail()}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => router.push('/signup')}
                    >
                        <Text style={styles.secondaryButtonText}>Don't have an account? Sign Up</Text>
                    </TouchableOpacity>


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
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    title: {
        fontSize: 42,
        fontWeight: '800',
        color: Colors.light.text,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.light.mutedForeground,
        marginTop: 8,
        letterSpacing: 0.5,
    },
    form: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        color: Colors.light.text,
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        backgroundColor: Colors.light.input,
        color: Colors.light.text,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
        fontSize: 16,
    },
    button: {
        backgroundColor: Colors.light.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 12,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: Colors.light.primaryForeground,
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        padding: 16,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: Colors.light.mutedForeground,
        fontSize: 14,
        fontWeight: '500',
    },
});
