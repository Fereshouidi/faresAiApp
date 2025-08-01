// SpaceBackground.tsx (Optimized)
import React, { memo, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  useColorScheme,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constent'; // Assuming this path is correct

const starsData = [
  { left: 119.273, top: 18.0747, scale: 0.196521 },
  { left: 166.774, top: 47.4519, scale: 0.33078 },
  { left: 238.677, top: 19.6434, scale: 1.29037 },
  { left: 22.2022, top: 4.69534, scale: 1.82231 },
  { left: 206.74, top: 40.7685, scale: 1.01375 },
  { left: 241.531, top: 14.2516, scale: 0.811597 },
  { left: 14.754, top: 25.2924, scale: 0.102529 },
  { left: 220.444, top: 43.9803, scale: 0.16088 },
  { left: 95.948, top: 54.8942, scale: 1.7822 },
  { left: 30.3484, top: 36.5984, scale: 1.16326 },
];

const styles = (isDark: boolean) => StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    borderRadius: 11,
    overflow: 'visible',
    position: "absolute",
    zIndex: 1,
    opacity: 0.25,
  },
  gradientContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 11,
    overflow: 'hidden',
    position: 'relative',
  },
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: isDark ? 'white' : colors.primaryColor[900],
  },
  shootingStar: {
    position: 'absolute',
    width: 80,
    height: 1,
    borderRadius: 50,
  },
});

const Star = memo(({ left, top, scale }: { left: number, top: number, scale: number }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  const theme = useColorScheme(); 
  const isDark = theme === 'dark';

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.cubic),
          // ✅ OPTIMIZATION: Offload animation to the native UI thread
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 1000,
          easing: Easing.inOut(Easing.cubic),
          // ✅ OPTIMIZATION: Offload animation to the native UI thread
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles(isDark).star, { left, top, transform: [{ scale }], opacity }]} />
  );
});

const ShootingStar = memo(({ i, color }: { i: number, color:string }) => {
  const anim = useRef(new Animated.Value(0)).current;
  const theme = useColorScheme(); 
  const isDark = theme === 'dark';

  useEffect(() => {
    const animate = () => {
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: 200 + Math.random() * 3000,
        delay: 1000 + Math.random() * 5000,
        easing: Easing.bezier(0.15, 0.23, 0.66, 1),
        // ✅ OPTIMIZATION: Offload animation to the native UI thread
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          animate();
        }
      });
    };
    animate();

    return () => anim.stopAnimation();
  }, [anim]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [420 - i * 70, -50 - i * 70],
  });
  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 500],
  });

  return (
    <Animated.View
      style={[
        styles(isDark).shootingStar,
        {
          backgroundColor: color,
          transform: [{ translateX }, { translateY }, { rotate: '-40deg' }],
          opacity: anim,
        },
      ]}
    />
  );
});

const SpaceBackground = () => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const shootingStarColor = isDark ? 'white' : colors.primaryColor[500];

  return (
    <View style={styles(isDark).container}>
      <LinearGradient
        colors={[
          colors.transparent,
          colors.transparent,
          colors.transparent,
          colors.transparent,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles(isDark).gradientContainer}
      >
        {starsData.map((star, index) => (
          <Star key={`star-${index}`} {...star} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <ShootingStar key={`shooting-star-${i}`} i={i} color={shootingStarColor} />
        ))}
      </LinearGradient>
    </View>
  );
};

export default memo(SpaceBackground);