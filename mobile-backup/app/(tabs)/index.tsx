import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Spacing } from '../../src/theme';
import { Avatar } from '../../src/components/ui/Avatar';
import { Card } from '../../src/components/ui/Card';
import { Text } from '../../src/components/ui/Text';
import { LoadingState } from '../../src/components/ui/LoadingState';
import { ErrorState } from '../../src/components/ui/ErrorState';
import { EmptyState } from '../../src/components/ui/EmptyState';
import { CommunityUseCases } from '../../src/application/communityUseCases';
import { Post } from '../../src/domain/types';

export default function HomeTab() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeed = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await CommunityUseCases.getPersonalizedFeed();
      setPosts(data);
    } catch (err: any) {
      setError("We couldn't refresh your feed.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (isLoading) return <LoadingState message="Getting your feed ready..." />;
  if (error) return <ErrorState message={error} onRetry={fetchFeed} />;
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text variant="display" color={Colors.primary} style={styles.headerTitle}>Orvyn</Text>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {posts.length === 0 ? (
          <EmptyState 
            title="No posts yet" 
            message="Your personalized feed will appear here once you join communities." 
            actionLabel="Explore Communities"
            onAction={() => router.push('/(tabs)/spaces' as any)}
          />
        ) : (
          posts.map(post => (
            <Card key={post.id} variant="surface" style={styles.postCard}>
              <View style={styles.cardHeader}>
                <View style={styles.authorInfo}>
                  <Avatar size={40} />
                  <View>
                    <Text variant="label" color={Colors.textPrimary}>{post.authorId}</Text>
                    <Text variant="caption" color={Colors.textSecondary}>{new Date(post.createdAt).toLocaleDateString()}</Text>
                  </View>
                </View>
              </View>
              
              <Text variant="body" color={Colors.textPrimary} style={styles.cardContent}>{post.content}</Text>
              
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text variant="label" color={Colors.textSecondary}>❤️ {post.likesCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text variant="label" color={Colors.textSecondary}>💬 {post.commentsCount}</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 24,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    gap: Spacing.md,
    paddingBottom: Spacing.xl * 3,
  },
  postCard: {
    marginBottom: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  cardContent: {
    marginBottom: Spacing.md,
    lineHeight: 24,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xl,
    marginTop: Spacing.xs,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  }
});
