import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

type SkeletonCardProps = {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
};

const SkeletonCard: React.FC<SkeletonCardProps> = ({ 
  width = '100%', 
  height = 100, 
  borderRadius = 16,
  style 
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [shimmerAnim]);

  // Interpolate between base color (#E8E0CE) and highlight color (#F8F4EC)
  const backgroundColor = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.creamDark, Colors.background],
  });

  return (
    <Animated.View
      style={[
        styles.base,
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        style
      ]}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: 'transparent',
  },
});

export default SkeletonCard;
