import { colors } from '@/constent';
import { ConversationOptionsParams } from '@/types'
import React from 'react'
import { View, Text, Image, TouchableOpacity, useColorScheme } from 'react-native'

const ConversationOptions = ({
    conversation
}: ConversationOptionsParams) => {

    const theme = useColorScheme(); 
    const isDark = theme === 'dark';

    const options = [
        {
            name: "delete", 
            icon: require('@/assets/trash.png'),
            onPress: () => {}
        },
        {
            name: "rename", 
            onPress: () => {},
            icon: isDark ? require('@/assets/penWhite.png') : require('@/assets/penBlack.png') ,
        }
    ]

  return (
    <View 
        className=' w-[170px] h-auto absolute top-[50%] right-[100%] rounded-2xl bg-whiteScale-100 dark:bg-blackScale-200 z-50 p-2'
        style={{
            boxShadow: `0 5px 15px ${isDark ? colors.whiteAlpha[50] : colors.blackAlpha[50]}`
        }}
    >
        {options.map(option => (
            <TouchableOpacity
                key={option.name}
                onPress={option.onPress}
                className='flex flex-row items-center p-2 gap-2'
            >
                <Image
                    source={option.icon}
                    className='w-5 h-5 font-bold'
                />
                <Text 
                    className={`rounded-lg ${option.name == 'delete'? "text-red-500" : " text-blackScale-900 dark:text-whiteScale-900 "}`}
                >{option.name}</Text>

            </TouchableOpacity>
        ))}
    </View>
  )
}

export default ConversationOptions;
