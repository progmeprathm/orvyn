import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useStore } from '../../src/store/useStore';
import { Colors, Typography, Spacing } from '../../src/theme';
import { Avatar } from '../../src/components/ui/Avatar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [commentText, setCommentText] = useState('');
  
  const post = useStore(state => state.posts.find(p => p.id === id));
  const comments = useStore(state => state.comments[id!] || []);
  const fetchComments = useStore(state => state.fetchComments);
  const addComment = useStore(state => state.addComment);
  const likePost = useStore(state => state.likePost);

  useEffect(() => {
    if (id) {
      fetchComments(id);
    }
  }, [id]);

  const handleSend = async () => {
    if (!commentText.trim() || !id) return;
    await addComment(id, commentText);
    setCommentText('');
  };

  if (!post) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ color: Colors.onBackground, textAlign: 'center', marginTop: 40 }}>Post not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: Spacing.sm }}>
          <Text style={{ color: Colors.primary, fontSize: 16 }}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thread</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
          
          {/* Original Post */}
          <View style={styles.originalPost}>
            <View style={styles.authorInfo}>
              <Avatar url={post.authorAvatar} size={48} />
              <View>
                <Text style={styles.authorName}>{post.authorName}</Text>
                <Text style={styles.timeContext}>{post.authorUsername} • {post.timeContext}</Text>
              </View>
            </View>
            
            <Text style={styles.cardTitle}>{post.title}</Text>
            <Text style={styles.cardContent}>{post.content}</Text>
            
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionButton} onPress={() => likePost(post.id)}>
                <Text style={[styles.actionIcon, post.isLikedByMe && { color: Colors.error }]}>
                  {post.isLikedByMe ? '❤️' : '🤍'}
                </Text>
                <Text style={[styles.actionText, post.isLikedByMe && { color: Colors.error, fontWeight: 'bold' }]}>{post.likes} Likes</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />
          
          <Text style={styles.commentsHeader}>Comments ({comments.length})</Text>

          {/* Comments List */}
          {comments.map(comment => (
            <View key={comment.id} style={styles.commentContainer}>
              <Avatar url={comment.authorAvatar} size={36} />
              <View style={styles.commentBody}>
                <View style={styles.commentAuthorRow}>
                  <Text style={styles.commentAuthorName}>{comment.authorName}</Text>
                  <Text style={styles.commentTime}>Just now</Text>
                </View>
                <Text style={styles.commentText}>{comment.content}</Text>
              </View>
            </View>
          ))}
          
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write a reply..."
            placeholderTextColor={Colors.onSurfaceVariant}
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, !commentText.trim() && { opacity: 0.5 }]} 
            onPress={handleSend}
            disabled={!commentText.trim()}
          >
            <Text style={styles.sendButtonText}>Reply</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outline,
  },
  headerTitle: {
    color: Colors.onBackground,
    fontFamily: Typography.fonts.display,
    fontSize: Typography.sizes.titleMd,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  originalPost: {
    paddingBottom: Spacing.md,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  authorName: {
    color: Colors.onSurface,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.labelLg,
    fontWeight: 'bold',
  },
  timeContext: {
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.labelSm,
  },
  cardTitle: {
    color: Colors.onSurface,
    fontFamily: Typography.fonts.display,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
  },
  cardContent: {
    color: Colors.onSurface,
    fontFamily: Typography.fonts.body,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionIcon: {
    fontSize: 20,
    color: Colors.onSurfaceVariant,
  },
  actionText: {
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.labelMd,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.outline,
    marginVertical: Spacing.md,
  },
  commentsHeader: {
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.labelMd,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
  },
  commentContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  commentBody: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: Spacing.sm,
    borderRadius: 12,
    borderTopLeftRadius: 4,
  },
  commentAuthorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  commentAuthorName: {
    color: Colors.onSurface,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.labelMd,
    fontWeight: 'bold',
  },
  commentTime: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
  },
  commentText: {
    color: Colors.onSurface,
    fontFamily: Typography.fonts.body,
    fontSize: 15,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.outline,
    backgroundColor: Colors.surfaceDim,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surface,
    color: Colors.onSurface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    minHeight: 40,
    maxHeight: 120,
    fontFamily: Typography.fonts.body,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: Spacing.md,
    backgroundColor: Colors.primaryContainer,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
    marginBottom: 2,
  },
  sendButtonText: {
    color: Colors.onPrimary,
    fontWeight: 'bold',
  }
});
