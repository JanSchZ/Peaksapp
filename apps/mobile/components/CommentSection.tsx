import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Send } from 'lucide-react-native';

interface Comment {
    id: string;
    user: string;
    text: string;
    timestamp: string;
}

export function CommentSection() {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<Comment[]>([
        { id: '1', user: 'Coach Mike', text: 'Great work on the squats last week. Focus on depth today.', timestamp: '2h ago' },
    ]);

    const handleSend = () => {
        if (!comment.trim()) return;
        const newComment: Comment = {
            id: Date.now().toString(),
            user: 'You',
            text: comment,
            timestamp: 'Just now',
        };
        setComments([...comments, newComment]);
        setComment('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Comments</Text>

            <View style={styles.commentList}>
                {comments.map((c) => (
                    <View key={c.id} style={styles.commentItem}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{c.user[0]}</Text>
                        </View>
                        <View style={styles.commentContent}>
                            <View style={styles.commentHeader}>
                                <Text style={styles.username}>{c.user}</Text>
                                <Text style={styles.timestamp}>{c.timestamp}</Text>
                            </View>
                            <Text style={styles.commentText}>{c.text}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a comment..."
                    placeholderTextColor={Colors.light.mutedForeground}
                    value={comment}
                    onChangeText={setComment}
                    multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Send size={20} color={Colors.light.primaryForeground} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        paddingBottom: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 16,
    },
    commentList: {
        gap: 16,
        marginBottom: 16,
    },
    commentItem: {
        flexDirection: 'row',
        gap: 12,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.light.muted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: Colors.light.text,
        fontWeight: '600',
        fontSize: 14,
    },
    commentContent: {
        flex: 1,
        backgroundColor: Colors.light.card,
        padding: 12,
        borderRadius: 12,
        borderTopLeftRadius: 0,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    username: {
        fontWeight: '600',
        color: Colors.light.text,
        fontSize: 14,
    },
    timestamp: {
        color: Colors.light.mutedForeground,
        fontSize: 12,
    },
    commentText: {
        color: Colors.light.text,
        lineHeight: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-end',
    },
    input: {
        flex: 1,
        backgroundColor: Colors.light.input,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingTop: 12,
        color: Colors.light.text,
        minHeight: 44,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.light.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
