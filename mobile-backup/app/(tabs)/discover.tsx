import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Spacing, Radii } from '../../src/theme';
import { Card } from '../../src/components/ui/Card';
import { useStore } from '../../src/store/useStore';

export default function DiscoverTab() {
  const spaces = useStore(state => state.spaces);
  
  // Just grabbing the first few as mock "trending" and "recommended"
  const trendingSpaces = spaces.slice(0, 3);
  const recommendedSpaces = spaces.slice(2, 5);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Spaces</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {trendingSpaces.map(space => (
            <TouchableOpacity 
              key={space.id} 
              activeOpacity={0.8}
              onPress={() => router.push(`/spaces/${space.id}`)}
            >
              <Card variant="glass" style={styles.spaceCard}>
                <Text style={styles.spaceTitle} numberOfLines={2}>{space.title}</Text>
                <Text style={styles.spaceDesc} numberOfLines={3}>{space.desc}</Text>
                <Text style={styles.memberCount}>{space.memberCount.toLocaleString()} Members</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
        </View>

        <View style={styles.verticalList}>
          {recommendedSpaces.map(space => (
            <TouchableOpacity 
              key={space.id} 
              style={styles.listCard}
              onPress={() => router.push(`/spaces/${space.id}`)}
            >
              <View style={styles.listCardImagePlaceholder} />
              <View style={styles.listCardContent}>
                <Text style={styles.listSpaceTitle}>{space.title}</Text>
                <Text style={styles.listSpaceDesc} numberOfLines={2}>{space.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New & Rising</Text>
        </View>

        <View style={styles.pillContainer}>
          <TouchableOpacity style={styles.pill}><Text style={styles.pillText}>#Indie Game Devs</Text></TouchableOpacity>
          <TouchableOpacity style={styles.pill}><Text style={styles.pillText}>#Sci-Fi Book Club</Text></TouchableOpacity>
          <TouchableOpacity style={styles.pill}><Text style={styles.pillText}>#Ambient Soundscapes</Text></TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    paddingHorizontal: Spacing.md,
    height: 64,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
  },
  headerTitle: {
    color: Colors.onBackground,
    fontFamily: Typography.fonts.display,
    fontSize: Typography.sizes.headlineMd,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: Spacing.xl * 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    color: Colors.onBackground,
    fontFamily: Typography.fonts.display,
    fontSize: Typography.sizes.titleMd,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: Colors.primary,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.labelMd,
    fontWeight: 'bold',
  },
  horizontalList: {
    paddingLeft: Spacing.md,
  },
  spaceCard: {
    width: 240,
    marginRight: Spacing.sm,
    height: 160,
  },
  spaceTitle: {
    color: Colors.onSurface,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.titleSm,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  spaceDesc: {
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.labelMd,
    lineHeight: 20,
    flex: 1,
  },
  memberCount: {
    color: Colors.primary,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.labelSm,
    marginTop: Spacing.sm,
    fontWeight: 'bold',
  },
  verticalList: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Radii.lg,
    padding: Spacing.sm,
    gap: Spacing.md,
    alignItems: 'center',
  },
  listCardImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: Radii.md,
    backgroundColor: Colors.primaryContainer,
  },
  listCardContent: {
    flex: 1,
  },
  listSpaceTitle: {
    color: Colors.onSurface,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.bodyMd,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  listSpaceDesc: {
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.labelMd,
    lineHeight: 18,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
  },
  pill: {
    backgroundColor: Colors.glassBackground,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  pillText: {
    color: Colors.primary,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.labelMd,
  }
});
