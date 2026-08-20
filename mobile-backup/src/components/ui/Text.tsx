import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../theme';

interface TextProps extends RNTextProps {
  variant?: keyof typeof Typography;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Text: React.FC<TextProps> = ({ 
  children, 
  variant = 'body', 
  color = Colors.textPrimary,
  align = 'left',
  style, 
  ...props 
}) => {
  return (
    <RNText 
      style={[
        Typography[variant],
        { color, textAlign: align },
        style
      ]} 
      {...props}
    >
      {children}
    </RNText>
  );
};
