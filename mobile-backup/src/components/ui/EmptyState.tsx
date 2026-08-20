import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { Button } from './Button';
import { Colors, Spacing } from '../../theme';

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, message, actionLabel, onAction }) => (
  <View style={styles.container}>
    <Text variant="h3" color={Colors.textPrimary} style={styles.title}>{title}</Text>
    <Text variant="body" color={Colors.textSecondary} align="center" style={styles.message}>{message}</Text>
    {actionLabel && onAction && (
      <Button onPress={onAction} style={styles.button}>{actionLabel}</Button>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
  },
  title: {
    marginBottom: Spacing.sm,
  },
  message: {
    marginBottom: Spacing.xl,
  },
  button: {
    minWidth: 160,
  }
});
