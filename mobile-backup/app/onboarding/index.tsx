import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Spacing } from '../../src/theme';
import { Button } from '../../src/components/ui/Button';

export default function OnboardingWelcome() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Orvyn</Text>
          <Text style={styles.subtitle}>Find your people. Build your space. Belong somewhere.</Text>
        </View>
        <View style={styles.footer}>
          <Button 
            title="Get Started" 
            onPress={() => router.push('/(tabs)')}
            style={styles.button}
          />
          <Button 
            title="Log In" 
            variant="ghost"
            onPress={() => router.push('/(tabs)')}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.primary,
    fontFamily: Typography.fonts.display,
    fontSize: Typography.sizes.displayLg,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
  },
  subtitle: {
    color: Colors.onSurfaceVariant,
    fontFamily: Typography.fonts.body,
    fontSize: Typography.sizes.bodyLg,
    textAlign: 'center',
    lineHeight: 28,
  },
  footer: {
    gap: Spacing.md,
  },
  button: {
    width: '100%',
  }
});
