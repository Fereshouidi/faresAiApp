import LottieView from 'lottie-react-native';
import React from 'react'
import { View, Image } from 'react-native';

const SplashScreen = () => {

  return (
    <View className='w-full h-full bg-whiteScale-800 dark:bg-blackScale-800 z-50'>

        <LottieView
            // className='w-full h-full bg-cover bg-whiteScale-800 dark:bg-blackScale-800'
            source={require("@/assets/AIanimation.json")}
            loop={false}
            autoPlay
            style={{
                width: '100%',
                height: '100%'
            }}
        />
      
    </View>
  )
}

export default SplashScreen;
