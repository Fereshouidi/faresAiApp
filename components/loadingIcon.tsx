import { colors } from '@/constent'
import LottieView from 'lottie-react-native'
import React from 'react'
import { useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoadingIcon = () => {

    const theme = useColorScheme(); 
    const isDark = theme === 'dark';
    
  return (
        <View 
            className='w-[150px] bg-whiteScale-900 dark:bg-blackScale-900 rounded-3xl flex justify-center items-center shadow-sm border z-50'
            style={{
                shadowColor: isDark? '#ffffff8a' : '#0000008a',
                borderColor: isDark? colors.whiteAlpha[100] : colors.blackAlpha[100],
            }}
            
        >

            <LottieView
                source={require('@/assets/loading.json')}
                autoPlay
                loop
                style={{ width: 100, height: 100 }}
            />

        </View>
  )
}

export default LoadingIcon
