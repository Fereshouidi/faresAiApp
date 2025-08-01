import { newConversation } from '@/constent';
import { HeaderParams } from '@/types';
import React from 'react'
import { View, Image, Text, useColorScheme, TouchableOpacity } from 'react-native'

const Header = ({
    className,
    isSideBarActive,
    setIsSideBarActive,
    activeConversation,
    setActiveConversation,
    style
}: HeaderParams) => {

    const theme = useColorScheme(); 
    const isDark = theme === 'dark';


  return (
    <View 
        className={`w-full h-12 flex flex-row items-center justify-between px-5 ${className}`}
        style={style}
    >
    
        <TouchableOpacity
            onPress={() => setIsSideBarActive(!isSideBarActive)}
        >
        
            <Image 
                source={isDark ? require('@/assets/menuWhite.png') : require('@/assets/menuBlack.png')}
            />
        </TouchableOpacity>


        <Text className='text-blackScale-800 dark:text-whiteScale-900 font-bold'>{activeConversation.title}</Text>

        <TouchableOpacity
            onPress={() => setActiveConversation(newConversation)}
        >
            <Image 
                source={isDark ? require('@/assets/newConversationWhite.png') : require('@/assets/newConversationBlack.png')}
                className='w-[24px] h-[24px]'
            />
        </TouchableOpacity>


    </View>
  )
}

export default Header
