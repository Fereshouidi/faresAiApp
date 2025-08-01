import LottieView from 'lottie-react-native'
import React from 'react'
import { useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoadingIcon from './loadingIcon'

const LoadingScreen = () => {

    
  return (
    <SafeAreaView 
        className='w-full h-full flex justify-center items-center'
        style={{
            zIndex: 200
        }}
    >

        <LoadingIcon/>

    </SafeAreaView>
  )
}

export default LoadingScreen
