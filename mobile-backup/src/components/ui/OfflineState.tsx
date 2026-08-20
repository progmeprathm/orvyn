import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { Button } from './Button';
import { Colors, Spacing } from '../../theme';

interface OfflineStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onContinueOffline?: () => void;
}

export const OfflineState: React.FC<OfflineStateProps> = ({ 
  title = "You're offline", 
  message = "We can't connect to Orvyn right now. New content won't load until you're connected.", 
  onRetry,
  onContinueOffline
}) => (
  <View style={styles.container}>
    <Text variant="h3" color={Colors.warning} style={styles.title}>{title}</Text>
    <Text variant="body" color={Colors.textSecondary} align="center" style={styles.message}>{message}</Text>
    
    {onRetry && (
      <Button onPress={onRetry} style={styles.button}>Try again</Button>
    )}
    {onContinueOffline && (
      <Button onPress={onContinueOffline} variant="ghost" style={[styles.button, styles.secondaryButton]}>Continue offline</Button>
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
