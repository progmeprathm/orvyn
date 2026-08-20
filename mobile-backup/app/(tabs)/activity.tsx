import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../../src/theme';

export default function ActivityTab() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.emptyText}>You're all caught up.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.lg,
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
    padding: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.bodyLg,
  },
});
