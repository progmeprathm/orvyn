import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { Button } from './Button';
import { Colors, Spacing } from '../../theme';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  title = "Something went wrong", 
  message, 
  onRetry 
}) => (
  <View style={styles.container}>
    <Text variant="h3" color={Colors.error} style={styles.title}>{title}</Text>
    <Text variant="body" color={Colors.textSecondary} align="center" style={styles.message}>{message}</Text>
    {onRetry && (
      <Button onPress={onRetry} variant="secondary" style={styles.button}>Try again</Button>
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
