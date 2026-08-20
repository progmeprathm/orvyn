import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { Button } from './Button';
import { Colors, Spacing } from '../../theme';

interface PermissionStateProps {
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onGoBack?: () => void;
}

export const PermissionState: React.FC<PermissionStateProps> = ({ 
  title = "Access Denied", 
  message, 
  actionLabel,
  onAction,
  onGoBack
}) => (
  <View style={styles.container}>
    <Text variant="h3" color={Colors.textPrimary} style={styles.title}>{title}</Text>
    <Text variant="body" color={Colors.textSecondary} align="center" style={styles.message}>{message}</Text>
    
    {actionLabel && onAction && (
      <Button onPress={onAction} style={styles.button}>{actionLabel}</Button>
    )}
    {onGoBack && (
      <Button onPress={onGoBack} variant="ghost" style={[styles.button, styles.secondaryButton]}>Go back</Button>
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
  },
  secondaryButton: {
    marginTop: Spacing.sm,
  }
});
