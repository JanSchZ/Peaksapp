import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function LogScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Log Workout</Text>
                <Text style={styles.subtitle}>Track your progress</Text>
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
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.dark.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.dark.mutedForeground,
    },
});
