import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'surface' | 'elevated' | 'outline';
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'surface', 
  style 
}) => {
  return (
    <View style={[styles.base, styles[variant], style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.large,
    padding: Spacing.lg,
    overflow: 'hidden',
  },
  surface: {
    backgroundColor: Colors.surfaceElevated,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  elevated: {
    backgroundColor: Colors.surfaceStrong,
    borderColor: Colors.borderStrong,
    borderWidth: 1,
    elevation: 2, // Android shadow
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: Colors.borderStrong,
    borderWidth: 1,
  }
});
