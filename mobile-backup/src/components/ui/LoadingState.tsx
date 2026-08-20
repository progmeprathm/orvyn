import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from './Text';
import { Colors, Spacing } from '../../theme';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Getting things ready...' }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={Colors.primary} />
    {message ? (
      <Text variant="body" color={Colors.textSecondary} style={styles.text}>{message}</Text>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
  },
  text: {
    marginTop: Spacing.lg,
  }
});
