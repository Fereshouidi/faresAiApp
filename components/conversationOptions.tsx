import { colors, newConversation } from '@/constent';
import { ConversationOptionsParams } from '@/types'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, useColorScheme } from 'react-native'
import StatusBanner from './statusBanner';
import { StatusBannerContext } from '@/contexts';
import { LoadingScreanContext } from '@/contexts';
import axios, { Axios } from 'axios';
import { url } from '@/api/crud';

const ConversationOptions = ({
    conversation,
    allConversations,
    setAllConversations,
    activeConversation,
    setActiveConversation,
    conversationToEdit, 
    setConversationToEdit,
    activeOptions,
    setActiveOptions
}: ConversationOptionsParams) => {

    const theme = useColorScheme(); 
    const isDark = theme === 'dark';
    const setStatusBanner = useContext(StatusBannerContext);
    const setLoadingScrean = useContext(LoadingScreanContext);
    const [index, setIndex] = useState<number>(-1);

    useEffect(() => {
    if (!activeOptions || !allConversations.length) return;

    const foundIndex = allConversations.findIndex(
        (conversation) => conversation._id === activeOptions
    );

    setIndex(foundIndex);
    }, [activeOptions, allConversations]);

    

    const [status, setStatus] = useState<string | null>(null);

    const handleDelete = async () => {
        try {
            setLoadingScrean(true);
            const res = await axios.delete(url + '/deleteConversation', {
                params: {
                    conversationId: conversation._id
                }
            })

            if (res.status != 200) setStatusBanner(true, 'something went wrong while deleting this conversation !', 'exclamation');

            conversation._id == activeConversation._id && setActiveConversation(newConversation)
            setAllConversations(allConversations.filter((c) => c._id != conversation._id));
            setStatusBanner(true, 'the conversation has been deleted', 'success');

            setLoadingScrean(false);

        } catch (err) {            
            setStatusBanner(true, 'something went wrong while deleting this conversation !', 'exclamation');
            setLoadingScrean(false);
        }
    }

    const handleEdit = async () => {
        setConversationToEdit(conversation._id?? null);
        setActiveOptions(null)
    }

    const options = [
        {
            name: "delete", 
            icon: require('@/assets/trash.png'),
            onPress: handleDelete
        },
        {
            name: "rename", 
            icon: isDark ? require('@/assets/penWhite.png') : require('@/assets/penBlack.png') ,
            onPress: handleEdit,
        }
    ]

    if (index == null) return;

  return (
    <View 
        className={` w-[170px] overflow-visible h-auto absolute ${index == 0 || index == 1 ? 'top-[50%]' : 'bottom-[50%]'}  right-[100%] rounded-2xl bg-whiteScale-100 dark:bg-blackScale-200 z-50 p-2`}
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
