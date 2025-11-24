import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Colors } from '../constants/Colors';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

interface ExpandableCardProps {
    title: string;
    summary: string | React.ReactNode;
    children: React.ReactNode;
    icon?: React.ReactNode;
}

export function ExpandableCard({ title, summary, children, icon }: ExpandableCardProps) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleExpand} style={styles.header} activeOpacity={0.7}>
                <View style={styles.headerLeft}>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        {!expanded && (
                            <View style={styles.summaryContainer}>
                                {typeof summary === 'string' ? (
                                    <Text style={styles.summary}>{summary}</Text>
                                ) : (
                                    summary
                                )}
                            </View>
                        )}
                    </View>
                </View>
                <View>
                    {expanded ? (
                        <ChevronUp size={20} color={Colors.light.mutedForeground} />
                    ) : (
                        <ChevronDown size={20} color={Colors.light.mutedForeground} />
                    )}
                </View>
            </TouchableOpacity>
            {expanded && (
                <View style={styles.content}>
                    {children}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.card,
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Colors.light.border,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
        backgroundColor: Colors.light.card,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.light.muted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    summaryContainer: {
        marginTop: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 2,
    },
    summary: {
        fontSize: 14,
        color: Colors.light.mutedForeground,
    },
    content: {
        padding: 16,
        paddingTop: 0,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
    },
});
