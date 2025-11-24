import React, { useState } from 'react';
import { Alert, StyleSheet, View, TextInput, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { supabase } from '../lib/supabase';
import { router } from 'expo-router';
import { Colors } from '../constants/Colors';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);

    async function signUpWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            Alert.alert(error.message);
        } else {
            Alert.alert('Success', 'Please check your inbox for email verification!');
            router.back();
        }
        setLoading(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Join Peaks</Text>
                    <Text style={styles.subtitle}>Start your high performance journey</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            onChangeText={(text) => setFullName(text)}
                            value={fullName}
                            placeholder="John Doe"
                            placeholderTextColor={Colors.dark.mutedForeground}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            placeholder="athlete@peaks.com"
                            placeholderTextColor={Colors.dark.mutedForeground}
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
                            placeholderTextColor={Colors.dark.mutedForeground}
                            autoCapitalize={'none'}
                            style={styles.input}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={() => signUpWithEmail()}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>{loading ? 'Creating account...' : 'Sign Up'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.secondaryButtonText}>Already have an account? Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
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
        fontSize: 32,
        fontWeight: '800',
        color: Colors.dark.text,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.dark.mutedForeground,
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
        color: Colors.dark.text,
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        backgroundColor: Colors.dark.input,
        color: Colors.dark.text,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.dark.border,
        fontSize: 16,
    },
    button: {
        backgroundColor: Colors.dark.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 12,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: Colors.dark.primaryForeground,
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        padding: 16,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: Colors.dark.mutedForeground,
        fontSize: 14,
        fontWeight: '500',
    },
});
