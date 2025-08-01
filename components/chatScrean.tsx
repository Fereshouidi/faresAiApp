import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, useColorScheme, View, Text } from 'react-native';
import Header from './Header';
import { ActiveModelProps, ChatScreanParams } from '@/types';
import MessageComposer from './MessageComposer';
import MessagesSection from './messagesSection';
import { SafeAreaView } from 'react-native-safe-area-context';
import { socket } from '@/api/socket.io';
import { colors } from '@/constent';
import { LanguageContext } from '@/contexts';

const ChatScreen = ({
  isSideBarActive,
  setIsSideBarActive,
  navigation,
  activeConversation,
  setActiveConversation,
  messages,
  setMessages,
  loadingGettingMessages,
  setLoadingGettingMessages,
  loadingGettingOldestMessages,
  setLoadingGettingOldestMessages,
  isAtTop, 
  setIsAtTop,
}: ChatScreanParams) => {

    const theme = useColorScheme(); 
    const isDark = theme === 'dark';
    const { width, height } = Dimensions.get('window');
    const [currentIndex, setCurrentIndex] = useState(1);
    const [userMessage, setUserMessage] = useState<string>('');
    const [messageToWait, setMessageToWait] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const activeLanguage = useContext(LanguageContext)?.activeLangue;



    const [activeModel, setActiveModel] = useState<ActiveModelProps>({id: 0, name: 'default', model: 'gemini-2.5-flash'});

    useEffect(() => {

      if (!userMessage) {
        return;
      }

      try {

        socket.on('receive-message', arg => {

          console.log({arg});
          

          if (arg.answer && arg.messageIndex > 0 ) {

            messages && setMessages([ arg.answer, ...messages]);
            setMessageToWait('');
            setIsLoading(false);

          } else if (arg.messageToWait) {

            setMessageToWait(arg.messageToWait);
            
          }  else if (arg.messageToWait == 'summarazing') {

            setMessageToWait(activeLanguage?.SavingContext?? '');

          } else if (!arg.answer) {

            setMessageToWait('');
            setIsLoading(false);

          } else {
            console.log({error: arg.error})
          }
        })

      } catch (err) {
        console.error({err})
      }

    }, [userMessage, messages.length, activeConversation._id, activeModel.model]);
  
  return (
    <SafeAreaView className='w-full h-full flex items-center' style={{width}}>
      
      <Header
        className='w-full h-14 '
        style= {{
          // boxShadow: `0 15px 15px ${isDark? colors.blackAlpha[100] : colors.whiteAlpha[100]}`
        }}
        isSideBarActive={isSideBarActive}
        setIsSideBarActive={setIsSideBarActive}
        activeConversation={activeConversation}
        setActiveConversation={setActiveConversation}
      />

        <View 
          className='w-full h-full flex-1 px-2'
        >
          <MessagesSection
            messages={messages}
            loadingGettingMessages={loadingGettingMessages}
            setLoadingGettingMessages={setLoadingGettingMessages}
            loadingGettingOldestMessages={loadingGettingOldestMessages}
            setLoadingGettingOldestMessages={setLoadingGettingOldestMessages}
            isAtTop={isAtTop}
            setIsAtTop={setIsAtTop}
            messageToWait={messageToWait}
            isLoading={isLoading}
          />
        </View>

        <MessageComposer
          activeModel={activeModel}
          setActiveModel={setActiveModel}
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          messages={messages}
          setMessages={setMessages} 
          activeConversation={activeConversation}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setMessageToWait={setMessageToWait}
        />

        <Text 
          className='text-blackScale-800 dark:text-whiteScale-800 m-1 text-xs text-center'
        > 
          {"FaresAi can make mistakes , \nFares don't take responsibility for what FaresAi says"}
        </Text>

    </SafeAreaView>
  )
}

export default ChatScreen;