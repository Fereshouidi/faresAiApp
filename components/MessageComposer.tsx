import { colors, createNewMessage, models } from '@/constent'
import { LanguageContext, UserContext } from '@/contexts';
import { MessageComposerProps } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState } from 'react'
import { View, Image, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView, useColorScheme, TouchableOpacity } from 'react-native'
import SideShadowScrollView from './SideShadowScrollView';
import { socket } from '@/api/socket.io';

const MessageComposer = ({
  activeModel,
  setActiveModel,
  userMessage, 
  setUserMessage,
  messages,
  setMessages,
  activeConversation,
  isLoading,
  setIsLoading,
  setMessageToWait
}: MessageComposerProps) => {

  const activeLanguage = useContext(LanguageContext)?.activeLangue;
  const theme = useColorScheme(); 
  const isDark = theme === 'dark';
  const isArabic = activeLanguage?.activeLanguage == 'ar';
  const [userInput, setUserInput] = useState<string>('');
  const user = useContext(UserContext);

  const sendMessage = () => {

    if (isLoading) {
      setIsLoading(false);
      setMessageToWait('');
      return ;
    }

    setIsLoading(true);
    setUserMessage(userInput);
    setMessages([createNewMessage(userInput), ...messages]);

    socket.emit('send-message', { 
      conversationId: activeConversation._id, 
      userId: user?._id,
      message: userInput, 
      isWaiting: false, 
      model: activeModel.model
    })

  }
  
  return (

    <View 
        className='w-[100%] flex flex-col rounded-2xl py-1 px-3'
        
    >
      <View 
        className='w-[100%] flex flex-col rounded-3xl p-2 bg-whiteScale-200 dark:bg-blackScale-200 border-[1px] shadow-lg' 
        style={{
          boxShadow: `0 5px 15px ${isDark? colors.whiteAlpha[10] : colors.blackAlpha[10]}`,
          borderColor: colors.whiteAlpha[500],
          // shadowColor: isDark ? '': colors.blackAlpha[800]
        }}
      >

        <View className='w-full min-h-[50px] max-h-[200px] rounded-2xl'>
            <TextInput
                placeholder='message...'
                placeholderClassName='text-blackScale-900 dark:text-whiteScale-900'
                placeholderTextColor={isDark ? colors.whiteAlpha[500] : colors.blackAlpha[500]}
                multiline={true}
                className='text-blackScale-900 dark:text-whiteScale-900 rounded-2xl font-medium text-[14.5px]'
                onChangeText={(e) => setUserInput(e)}
            />
        </View>

        <View className='w-full flex flex-row items-center justify-between px-2'>

          <View className=' flex-1 rounded-2xl m-1 p-0flex flex-row justify-start items-center'>

            <TouchableOpacity 
              className='w-10 h-10 rounded-full bg-whiteScale-10 dark:bg-blackScale-10 p-3'
              onPress={() => {}}
            >
              <Image
                source={isDark? require('@/assets/plusWhite.png'): require('@/assets/plusBlack.png')}
                className='w-full h-full '
              />
            </TouchableOpacity>
            
            <View className='w-[80%] m-2 p-0'>

              <SideShadowScrollView
                gradientColor={isDark ? colors.blackScale[200] : colors.whiteScale[200]}
                gradientWidth={30}
                className=''
                style={{height: 30}}
              >
                {models.map(model => (
                  <TouchableOpacity
                    key={model.id}
                    onPress={() => setActiveModel(model)}
                    className="mx-[2px] bg-whiteScale-100 dark:bg-blackScale-900 rounded-full p-2 border-[1px] flex justify-center items-center"
                    style={{borderColor: model.id == activeModel.id ? colors.primaryColor[500] : isDark ? colors.whiteAlpha[300] : colors.blackAlpha[300]}}
                  >
                    <Text 
                      className='text-[10px] text-center'
                      style={{color: model.id == activeModel.id ? colors.primaryColor[500] : isDark ? colors.whiteAlpha[700] : colors.blackAlpha[700]}}
                    >{model.name}</Text>

                  </TouchableOpacity>
                ))}
              </SideShadowScrollView>

            </View>

          </View>

          <TouchableOpacity 
            className='w-11 h-11 bg-primaryColor-500 rounded-full p-[9px]'
            onPress={sendMessage}
          >
            <Image
              source={isLoading ? require('@/assets/stopWhite.png') : require('@/assets/arrowTopWhite.png')}
              className='w-full h-full'
            />
          </TouchableOpacity>

        </View>

      </View>

    </View>
            
  )
}

export default MessageComposer
