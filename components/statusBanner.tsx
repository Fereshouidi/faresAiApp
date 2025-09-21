import { colors } from '@/constent'
import { StatusBannerParams, StatusBannerParams_ } from '@/types'
import LottieView from 'lottie-react-native'
import React, { useContext } from 'react'
import { TouchableOpacity, useColorScheme, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
// import { StatusBannerContext } from '@/contexts';

const StatusBanner = ({
    className,
    text,
    visibility,
    onPress,
    status,
}: StatusBannerParams_) => {

    const theme = useColorScheme(); 
    const isDark = theme === 'dark';
    // const setBanner = useContext(StatusBannerContext)?.setBanner;

    // if (!onPress) return console.log({onPress});
     

  {return (
    <TouchableOpacity
        className={`w-full h-full flex justify-center items-center absolute top-0 left-0 bg-whiteAlpha-700 dark:bg-blackAlpha-700`}
        style={{
            zIndex: 250,
            display: visibility ? 'flex' : 'none'
        }}
        onPress={onPress} 
    >

        <View 
            className='w-[300px] h-[400px] flex justify-center items-center bg-whiteScale-900 dark:bg-blackScale-900 rounded-3xl shadow-md border z-50'
            style={{
                shadowColor: isDark? '#ffffff8a' : '#0000008a',
                borderColor: isDark? colors.whiteAlpha[100] : colors.blackAlpha[100],
            }}
        >
            
           <LottieView
                source={
                    status == 'success' ? 
                        require('@/assets/Success.json') : 
                    status == 'fail' ?
                        require('@/assets/fail.json') : 
                    status == 'exclamation' ?
                        require('@/assets/AlertIconExclamation.json') :
                    require('@/assets/AlertIconExclamation.json')
                    }
                autoPlay
                loop={false}
                style={{ width: 200, height: 200, marginBottom: 25 }}
            /> 

            <Text 
                className='w-[200px] mb-10 text-center text-blackScale-800 dark:text-whiteScale-800' 
            >{text}</Text>

        </View>

    </TouchableOpacity>
  )}
}

export default StatusBanner
