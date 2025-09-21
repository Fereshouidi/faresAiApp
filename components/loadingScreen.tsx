import LottieView from 'lottie-react-native'
import React from 'react'
import { Dimensions, useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoadingIcon from './loadingIcon'

const LoadingScreen = () => {

  const theme = useColorScheme(); 
  const isDark = theme === 'dark';
    
  return (
    <SafeAreaView 
        className=' h-full absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-blackAlpha-100 dark:bg-whiteAlpha-100'
        style={{
            zIndex: 200,
            // width: width
        }}
    >

        <LoadingIcon/>

    </SafeAreaView>
  )
}

export default LoadingScreen
