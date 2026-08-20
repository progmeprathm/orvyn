import React from 'react';
import { Image, View, StyleSheet, ImageStyle } from 'react-native';
import { Colors, Radius } from '../../theme';

interface AvatarProps {
  url?: string | null;
  size?: number;
  style?: ImageStyle;
}

export const Avatar: React.FC<AvatarProps> = ({ url, size = 40, style }) => {
  const roundedStyle = {
    width: size,
    height: size,
    borderRadius: Radius.full,
  };

  if (!url) {
    return <View style={[styles.fallback, roundedStyle, style]} />;
  }

  return (
    <Image 
      source={{ uri: url }} 
      style={[styles.image, roundedStyle, style]} 
    />
  );
};

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
  },
  image: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
  }
});
