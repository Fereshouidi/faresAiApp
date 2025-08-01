import React from 'react';
import { ScrollView, View, StyleSheet, ScrollViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface SideShadowScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
  gradientWidth?: number;
  gradientColor?: string;
  className?: string
}

const SideShadowScrollView: React.FC<SideShadowScrollViewProps> = ({
  children,
  gradientWidth = 20,
  gradientColor = 'rgba(0,0,0,0.15)',
  className,
  ...props
}) => {
  return (
    <View style={styles.wrapper} className={`  ${className}`}>
      
      {/* Scrollable content */}
      <ScrollView
        className=''
        horizontal
        scrollEnabled
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        {...props}
      >
        {children}
      </ScrollView>

      {/* Left shadow */}
      <LinearGradient
        colors={[gradientColor, 'transparent']}
        className=''
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.shadowLeft, { left: 0, width: gradientWidth }]}
        pointerEvents="none"
      />

      {/* Right shadow */}
      <LinearGradient
        colors={['transparent', gradientColor]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.shadowRight, { right: 0, width: gradientWidth }]}
        pointerEvents="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        // height: 40,
        position: 'relative',
        borderRadius: 50,
        
    },
    shadowLeft: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 10,
        // borderTopLeftRadius: 9999,
        // borderBottomLeftRadius: 9999,
        overflow: 'hidden',
    },

    shadowRight: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 10,
        // borderTopRightRadius: 9999,
        // borderBottomRightRadius: 9999,
        overflow: 'hidden',
    },


});

export default SideShadowScrollView;
