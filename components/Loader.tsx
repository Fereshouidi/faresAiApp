import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Loader: React.FC = () => {
  // Use Animated.Value to manage the rotation animation state
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the rotation loop
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1, // Animate from 0 to 1
        duration: 2000, // Duration matches the original 2s
        useNativeDriver: true, // Use native driver for better performance
      })
    ).start();
  }, [rotation]);

  // Define interpolations for each ring based on the original CSS keyframes
  // The original keyframes rotate 360 degrees (or -360) over 2 seconds.
  // We map the input (0 to 1) to the rotation range.

  // Ring 1: from 110deg to 470deg (360deg rotation)
  const rotateZ1 = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['110deg', '470deg'],
  });

  // Ring 2: from 20deg to 380deg (360deg rotation)
  const rotateZ2 = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['20deg', '380deg'],
  });

  // Ring 3: from 450deg to 90deg (-360deg rotation)
  const rotateZ3 = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['450deg', '90deg'],
  });

  // Ring 4: from 270deg to 630deg (360deg rotation)
  const rotateZ4 = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['270deg', '630deg'],
  });

  // Since React Native Animated needs separate transform properties for combined rotations,
  // we combine the static rotations (rotateX, rotateY) and the animated rotateZ.

  // Ring 1 transformations: rotateX(50deg)
  const ring1Style = {
    transform: [
      { perspective: 800 }, // Added perspective for 3D effect
      { rotateX: '50deg' },
      { rotateZ: rotateZ1 },
    ],
  };

  // Ring 2 transformations: rotateX(20deg) rotateY(50deg)
  const ring2Style = {
    transform: [
      { perspective: 800 },
      { rotateX: '20deg' },
      { rotateY: '50deg' },
      { rotateZ: rotateZ2 },
    ],
  };

  // Ring 3 transformations: rotateX(40deg) rotateY(130deg)
  const ring3Style = {
    transform: [
      { perspective: 800 },
      { rotateX: '40deg' },
      { rotateY: '130deg' },
      { rotateZ: rotateZ3 },
    ],
  };

  // Ring 4 transformations: rotateX(70deg)
  const ring4Style = {
    transform: [
      { perspective: 800 },
      { rotateX: '70deg' },
      { rotateZ: rotateZ4 },
    ],
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {/* Ring 1 */}
        <Animated.View style={[styles.ring, styles.ring1, ring1Style]} />
        {/* Ring 2 */}
        <Animated.View style={[styles.ring, styles.ring2, ring2Style]} />
        {/* Ring 3 */}
        <Animated.View style={[styles.ring, styles.ring3, ring3Style]} />
        {/* Ring 4 */}
        <Animated.View style={[styles.ring, styles.ring4, ring4Style]} />
        
        <Text style={styles.loadingText}>loading</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    // Mimics flex display and centering from the original
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Added background for better visualization
  },
  container: {
    // Mimics the container positioning and centering
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  loadingText: {
    color: 'rgb(82, 79, 79)',
    fontSize: 16,
    // Ensure text is above the rings
    zIndex: 10, 
  },
  ring: {
    width: 190,
    height: 190,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 95, // 50% for 190px width/height
    position: 'absolute',
  },
  // Ring colors match the original CSS properties
  ring1: {
    borderBottomWidth: 8,
    borderBottomColor: 'rgb(240, 42, 230)',
  },
  ring2: {
    borderBottomWidth: 8,
    borderBottomColor: 'rgb(240, 19, 67)',
  },
  ring3: {
    borderBottomWidth: 8,
    borderBottomColor: 'rgb(3, 170, 170)',
  },
  ring4: {
    borderBottomWidth: 8,
    borderBottomColor: 'rgb(207, 135, 1)',
  },
});

export default Loader;