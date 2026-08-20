import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../../src/theme';
import { Avatar } from '../../src/components/ui/Avatar';
import { Button } from '../../src/components/ui/Button';
import { useStore } from '../../src/store/useStore';
import { useSessionStore } from '../../src/store/useSessionStore';

export default function ProfileTab() {
  const profile = useSessionStore(state => state.profile);
  const joinedSpacesCount = useStore(state => state.spaces.filter(s => s.isJoined).length);
  const myPostsCount = useStore(state => profile ? state.posts.filter(p => p.authorUsername === profile.username).length : 0);

  if (!profile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: Colors.textPrimary }}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Avatar size={80} url={profile.avatarUrl} />
          <View style={styles.info}>
            <Text style={styles.name}>{profile.displayName}</Text>
            <Text style={styles.username}>{profile.username}</Text>
            <Text style={styles.bio}>{profile.bio}</Text>
          </View>
          <Button title="Edit Profile" variant="secondary" style={styles.editButton} />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{profile.followersCount}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{profile.followingCount}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{joinedSpacesCount}</Text>
            <Text style={styles.statLabel}>Spaces</Text>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <View style={styles.tabActive}>
            <Text style={styles.tabTextActive}>Posts ({myPostsCount})</Text>
          </View>
          <View style={styles.tabInactive}>
            <Text style={styles.tabTextInactive}>Spaces</Text>
          </View>
          <View style={styles.tabInactive}>
            <Text style={styles.tabTextInactive}>About</Text>
          </View>
        </View>

        <View style={styles.emptyState}>
          {myPostsCount === 0 ? (
            <Text style={styles.emptyText}>You haven't posted yet.</Text>
          ) : (
            <Text style={styles.emptyText}>Your posts will appear here.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  info: {
    alignItems: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  name: {
    color: Colors.onBackground,
    fontFamily: Typography.fonts.display,
    fontSize: Typography.sizes.titleLg,
    fontWeight: 'bold',
  },
  username: {
    color: Colors.primary,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.bodyMd,
    marginBottom: Spacing.sm,
  },
  bio: {
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.bodyMd,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
  editButton: {
    width: '100%',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.outlineVariant,
    marginBottom: Spacing.lg,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    color: Colors.onBackground,
    fontFamily: Typography.fonts.display,
    fontSize: Typography.sizes.titleLg,
    fontWeight: 'bold',
  },
  statLabel: {
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.labelMd,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
    marginBottom: Spacing.xl,
  },
  tabActive: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    alignItems: 'center',
  },
  tabTextActive: {
    color: Colors.primary,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.labelMd,
    fontWeight: 'bold',
  },
  tabInactive: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  tabTextInactive: {
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.labelMd,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.bodyMd,
  }
});
