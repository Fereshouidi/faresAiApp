import { ButtonParams } from '@/types'
import React, { memo } from 'react'
import { TouchableOpacity, View, Text, Image, useColorScheme } from 'react-native'

const Button = ({
    tittle,
    onPress,
    className,
    textClassName,
    icon,
    isWork,
}: ButtonParams) => {

    const theme = useColorScheme(); 
    const isDark = theme === 'dark';
    
  return (
    <TouchableOpacity
        className={`w-[90%] mt-5 h-12 flex flex-row justify-center items-center rounded-full ${isWork? 'bg-primaryColor-500 shadow-sm' : 'bg-primaryColor-500 opacity-50'} ${className}`}
        style={{
            shadowColor: isDark? '#ffffff8a' : '#0000008a'
        }}
        activeOpacity={0.5}
        onPress={isWork ? onPress : undefined}
    >
        <Text className={`font-bold text-whiteScale-900 ${className}`}>{tittle}</Text>

        {icon && <Image
            source={icon}
            className='w-5 h-5 mx-2'
        />}

    </TouchableOpacity>
  )
}

export default memo(Button);
