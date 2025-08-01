// components/BlurredImage.tsx

import { memo } from 'react';
import { View, Image, StyleSheet, Dimensions, useColorScheme } from 'react-native';
// import { BlurView } from 'expo-blur';
import { BlurView } from '@react-native-community/blur';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurredImageParams } from '@/types';

const { height } = Dimensions.get('window');

const BlurredImage = ({ 
  source, 
  className, 
  imageClassName, 
  blurClassName, 
  opacity,
  style,
}: BlurredImageParams) => {

    const theme = useColorScheme(); 
    const isDark = theme === 'dark';
    
  return (
    <View 
      className={`relative overflow-hidden flex justify-center items-center ${className}`}
      style={style}

    >
      <Image 
        source={source} 
        className={` ${imageClassName}`} 
        style={{ resizeMode: 'cover', opacity: opacity }}
      />

      <View className={`absolute bottom-0 w-full h-full overflow-hidden ${blurClassName}`}>

        {/* <BlurView 
          intensity={intensity}
          tint={tint}
          // className={`absolute bottom-0 w-full h-full overflow-hidden ${blurClassName}`}
        /> */}

        <LinearGradient
          colors={['transparent', isDark? '#1a1a1a' : '#e4e4e4']}
          style={StyleSheet.absoluteFill}
          // start={{ x: 0, y: 0 }}
          // end={{ x: 0, y: 1 }}
        />
      </View>
    </View>
  );
};

export default memo(BlurredImage);
