import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '../../src/components/ui/Text';
import { Button } from '../../src/components/ui/Button';
import { Colors, Spacing } from '../../src/theme';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="display" color={Colors.primary} align="center">Orvyn</Text>
          <Text variant="bodyLarge" color={Colors.textSecondary} align="center" style={styles.subtitle}>
            Communities & Fandom, Reimagined.
          </Text>
        </View>
        
        <View style={styles.actions}>
          <Button size="lg" onPress={() => router.push('/(auth)/signup')}>
            Create Account
          </Button>
          <Button variant="secondary" size="lg" onPress={() => router.push('/(auth)/login')}>
            Sign In
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    marginTop: Spacing.sm,
  },
  actions: {
    gap: Spacing.md,
    paddingBottom: Spacing.xxxl,
  }
});
