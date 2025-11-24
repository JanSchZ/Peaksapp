import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Animated, Dimensions } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Send, X, Sparkles, Plus } from 'lucide-react-native';
import { supabase } from '../../lib/supabase';

interface AssistantSheetProps {
    visible: boolean;
    onClose: () => void;
    onAction?: (action: any) => void;
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    type?: 'text' | 'workout_suggestion' | 'trend_alert';
    data?: any;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

export function AssistantSheet({ visible, onClose, onAction }: AssistantSheetProps) {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'assistant', content: 'Hello Coach. I\'ve analyzed the recent training data. Sarah seems to be accumulating fatigue on her lower body. Should we adjust the volume for this week?' }
    ]);
    const [inputText, setInputText] = useState('');
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    const [isTyping, setIsTyping] = useState(false);

    const [show, setShow] = useState(visible);

    React.useEffect(() => {
        if (visible) {
            setShow(true);
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                damping: 20,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: SCREEN_HEIGHT,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setShow(false));
        }
    }, [visible]);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: inputText };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        try {
            const { data, error } = await supabase.functions.invoke('chat-assistant', {
                body: {
                    messages: [...messages, userMsg],
                    context: {
                        // In a real app, pass current plan ID, week, etc.
                        planContext: 'Editing Week 1'
                    }
                }
            });

            if (error) throw error;

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.content,
                data: data.data
            };

            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error('AI Error:', error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I'm having trouble connecting to the server. Please try again."
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    if (!show) return null;

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Sparkles size={20} color={Colors.light.primary} />
                    <Text style={styles.headerTitle}>Peaks Intelligence</Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <X size={24} color={Colors.light.mutedForeground} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.messagesList} contentContainerStyle={styles.messagesContent}>
                {messages.map((msg) => (
                    <View key={msg.id} style={[
                        styles.messageBubble,
                        msg.role === 'user' ? styles.userBubble : styles.assistantBubble
                    ]}>
                        <Text style={[
                            styles.messageText,
                            msg.role === 'user' ? styles.userText : styles.assistantText
                        ]}>{msg.content}</Text>

                        {msg.type === 'workout_suggestion' && (
                            <View style={styles.suggestionCard}>
                                <View style={styles.suggestionHeader}>
                                    <Text style={styles.suggestionTitle}>{msg.data.title}</Text>
                                    <Text style={styles.suggestionDuration}>{msg.data.duration}</Text>
                                </View>
                                <View style={styles.exercisesList}>
                                    {msg.data.exercises.map((ex: string, i: number) => (
                                        <Text key={i} style={styles.exerciseItem}>• {ex}</Text>
                                    ))}
                                </View>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => onAction?.({ type: 'ADD_WORKOUT', payload: msg.data })}
                                >
                                    <Plus size={16} color="#fff" />
                                    <Text style={styles.actionButtonText}>Add to Plan</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ask about trends, volume, or create workouts..."
                        placeholderTextColor={Colors.light.mutedForeground}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                    />
                    <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                        <Send size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '85%',
        backgroundColor: Colors.light.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 10,
        zIndex: 1000,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    closeButton: {
        padding: 4,
    },
    messagesList: {
        flex: 1,
    },
    messagesContent: {
        padding: 20,
        gap: 16,
    },
    messageBubble: {
        maxWidth: '85%',
        padding: 16,
        borderRadius: 16,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.light.primary,
        borderBottomRightRadius: 4,
    },
    assistantBubble: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.light.input,
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 24,
    },
    userText: {
        color: '#fff',
    },
    assistantText: {
        color: Colors.light.text,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
        gap: 12,
        paddingBottom: Platform.OS === 'ios' ? 40 : 16,
    },
    input: {
        flex: 1,
        backgroundColor: Colors.light.input,
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: 16,
        color: Colors.light.text,
        maxHeight: 100,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.light.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    suggestionCard: {
        marginTop: 12,
        backgroundColor: Colors.light.background,
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    suggestionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    suggestionTitle: {
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    suggestionDuration: {
        color: Colors.light.mutedForeground,
        fontSize: 12,
    },
    exercisesList: {
        gap: 4,
        marginBottom: 12,
    },
    exerciseItem: {
        fontSize: 14,
        color: Colors.light.text,
    },
    actionButton: {
        backgroundColor: Colors.light.text,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 8,
        gap: 6,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
});
