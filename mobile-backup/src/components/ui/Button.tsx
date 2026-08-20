import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors, Radius, Spacing } from '../../theme';
import { Text } from './Text';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading,
  disabled,
  onPress,
  style 
}) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';
  const isDestructive = variant === 'destructive';
  
  let bg = isPrimary ? Colors.primary : isSecondary ? Colors.surfaceElevated : isDestructive ? Colors.error : 'transparent';
  let textColor = isPrimary ? Colors.textPrimary : isSecondary ? Colors.textPrimary : isDestructive ? Colors.textPrimary : isGhost ? Colors.textSecondary : Colors.primary;
  let borderColor = isOutline ? Colors.borderStrong : 'transparent';
  
  const paddingV = size === 'sm' ? Spacing.sm : size === 'lg' ? Spacing.lg : Spacing.md;
  const paddingH = size === 'sm' ? Spacing.lg : size === 'lg' ? Spacing.xxxl : Spacing.xxl;

  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[
        styles.base, 
        { 
          backgroundColor: bg,
          paddingVertical: paddingV,
          paddingHorizontal: paddingH,
          borderColor: borderColor,
          borderWidth: isOutline ? 1 : 0,
          opacity: disabled ? 0.5 : 1
        },
        style
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text variant="button" color={textColor}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }
});
