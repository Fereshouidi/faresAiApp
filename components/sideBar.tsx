import { url } from '@/api/crud';
import { LanguageContext } from '@/contexts';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, useColorScheme, ScrollView, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native';
import { UserTokenContext } from '@/contexts';
import { ConversationParams, SideBarProps } from '@/types';
import { UserContext } from '@/contexts';
import { formatSmartDate } from '@/helper/handleDatas';
import Loader from './Loader';
import LoadingIcon from './loadingIcon';
import LoadingScreen from './loadingScreen';
import LottieView from 'lottie-react-native';
import { socket } from '@/api/socket.io';
import { colors } from '@/constent';
import ConversationOptions from './conversationOptions';

const SideBar = ({ 
  navigation, 
  isSideBarActive,
  setIsSideBarActive,
  conversations,
  setConversations,
  activeConversation, 
  setActiveConversation 
}: SideBarProps) => {

  const activeLanguage = useContext(LanguageContext)?.activeLangue;
  const theme = useColorScheme(); 
  const isDark = theme === 'dark';
  const isArabic = activeLanguage?.activeLanguage == 'ar';
  const userData = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeOptions, setActiveOptions] = useState<string | undefined>(undefined);

  useEffect(() => {

    const fetchData = async () => {

      socket.emit('get-conversations', { userId: userData?._id });

      socket.on('get-conversations-response', (data) => {
        const conversations = data.conversations as ConversationParams[];
        if (conversations) {
          setConversations(conversations);
          setLoading(false);
        }
      });

      socket.on('get-updated-conversation', (updatedConversation: ConversationParams) => {
        
        if (updatedConversation && conversations) {
          setConversations(conversations.map((c) => {
            return c._id == updatedConversation._id ? updatedConversation : c
          }));
        }
      });

    }
    fetchData();

  }, [userData?._id, conversations?.length])


  useEffect(() => {

    const fetchData = async () => {

      socket.on('add-conversation', (data) => {
        console.log({newConversation: data});
        
        const newConversation = data.newConversation as ConversationParams;
        if (newConversation && conversations) {
          setConversations([...conversations, newConversation]);
          setActiveConversation(newConversation);
          setLoading(false);
        }
      });

    }
    fetchData();

  }, [activeConversation?._id, conversations?.length])




  return (
    <TouchableWithoutFeedback onPress={() => setActiveOptions(undefined)}>
      <View 
        className='w-[300px] h-full flex justify-between '
        style={{
          boxShadow: isDark ? `0px 5px 15px ${colors.whiteAlpha[50]}` : `0 5px 15px ${colors.blackAlpha[50]}`
        }}
      >

        <View className=' w-full flex-1'>
                
          <Text className='text-blackScale-700 dark:text-whiteScale-700 px-5 m-4'>conversations :</Text>

          <View className=' w-full flex-1'>

            {loading && 
              <View className='absolute w-full h-full flex justify-center items-center'>
                <LottieView
                  source={require('@/assets/loading.json')}
                  autoPlay
                  loop
                  style={{ width: 100, height: 100 }}
                />
              </View>
            }

            {!conversations && !loading ?

              <View className='w-full h-full flew justify-center items-center '>
                <Text className='text-blackScale-800 dark:text-whiteScale-800'>{activeLanguage?.noConversation}</Text>
              </View>
                            
            : <ScrollView className=' w-full '>
                {conversations?.map(conversation => (

                    <View 
                      key={conversation._id}
                      className='w-full h-14 flex flex-row justify-between items-center'
                    >

                      <TouchableOpacity 
                        className={` h-full flex flex-1 justify-center px-5 `}
                        activeOpacity={0.6}
                        onPress={() => {
                          setActiveConversation(conversation);
                          setIsSideBarActive(false)
                        }}
                        onLongPress={() => setActiveOptions(activeOptions == conversation._id ? undefined : conversation._id)}
                      >
                        <Text
                          className='text-blackScale-900 dark:text-whiteScale-900'
                        >
                          {
                            conversation?.title?.length && conversation?.title?.length < 30 ? 
                            conversation.title : 
                            conversation.title?.slice(0, 20) + ' ...' 
                          }
                        </Text>

                          <View className='w-full flex flex-row justify-start gap-2 m-1 '>

                            <Text
                              className='text-blackAlpha-500 dark:text-whiteAlpha-500 text-[12px]'
                            >
                              {conversation.createdAt ? formatSmartDate(conversation.createdAt) : '...'}
                            </Text>

                            <Text
                              className='text-blackAlpha-500 dark:text-whiteAlpha-500 text-[11px]'
                            >
                              {conversation.length + " MS"}
                            </Text>

                          </View>

                      </TouchableOpacity>

                      <View className='w-14 h-14 relative overflow-visible'>
                      <TouchableOpacity
                        className='w-14 h-14 flex justify-center items-center p-2 rounded-full'
                        onPress={() => setActiveOptions(activeOptions == conversation._id ? undefined : conversation._id)}
                      >
                        <Image
                          source={isDark ? require('@/assets/optionsWhite.png') : require('@/assets/optionsBlack.png')}
                          className='w-4 h-4'
                        />
                      </TouchableOpacity>
                      
                        {
                          activeOptions === conversation._id && 
                            <ConversationOptions conversation={conversation}/>
                        }
                      </View>

                    </View>


                ))}
              </ScrollView>
            }

          </View>

        </View>



        <TouchableOpacity 
          className='w-full h-16 flex flex-row justify-between p-4'
          onPress={() => navigation.push('setting')}
        >

          
          <View className='h-full flex flex-row'>
                    
            <Image
              source={isDark ? require('@/assets/userCircleWhite.png') : require('@/assets/userCircleBlack.png')}
              className='w-6 h-6 mx-2' 
            />

            <Text
              className='text-blackScale-900 dark:text-whiteScale-900 font-bold'
            >
              {userData?.name + ' ' + userData?.familyName}
            </Text>

          </View>


          <Image
            source={isDark ? require('@/assets/settingWhite.png') : require('@/assets/settingBlack.png')}
            className='w-6 h-6 mx-2' 
          />

        </TouchableOpacity>

      </View>
    </TouchableWithoutFeedback>
  )
}

export default SideBar;
