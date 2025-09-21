import { StatusBar } from 'expo-status-bar';
import { Text, View, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import '@/global.css';
import Header from '@/components/Header';
import Swiper from 'react-native-swiper';
import SideBar from '@/components/sideBar';
import CustomSwiper from '@/components/customSwipper';
import { use, useContext, useEffect, useRef, useState } from 'react';
import ChatScreen from '@/components/chatScrean';
import { ConversationParams, HomeParams, MessageParams } from '@/types';
import { newConversation } from '@/constent';
import axios from 'axios';
import { url } from '@/api/crud';
import { UserContext } from '@/contexts';
import { io } from 'socket.io-client';
import { socket } from '@/api/socket.io';

const Home = ({ navigation }: HomeParams) => {

  const theme = useColorScheme(); 
  const isDark = theme === 'dark';
  const { width } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(1);
  const user = useContext(UserContext);

  const [isSideBarActive, setIsSideBarActive] = useState<boolean>(false);
  
  const [conversations, setConversations] = useState< ConversationParams[] | undefined>(undefined);
  const [activeConversation, setActiveConversation] = useState<ConversationParams>(newConversation);
  const [skip, setSkip] = useState<number>(0);
  const [isAtTop, setIsAtTop] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageParams[] | []>([]);
  const [loadingGettingMessages, setLoadingGettingMessages] = useState<boolean>(true);
  const [loadingGettingOldestMessages, setLoadingGettingOldestMessages] = useState<boolean>(true);
  const socketRef = useRef(socket);


  useEffect(() => {
    setCurrentIndex(isSideBarActive ? 0 : 1);
  }, [isSideBarActive])

  useEffect(() => {
    setIsSideBarActive(currentIndex == 0);
  }, [currentIndex])
  
  useEffect(() => {
    setCurrentIndex(1);
  }, [])

  useEffect(() => {

    if (activeConversation._id == newConversation._id) {
      setLoadingGettingMessages(false);
      setMessages([]);
      return;
    }

    setLoadingGettingMessages(true);
    const fetchData = async () => {
      
      axios.get(url + '/getConversationSlice', {
        params: {
          conversationId: activeConversation._id,
          skip: 0
        }
      })
      .then(data => {

        const reversedMessages = data.data.slice.reverse();
        setMessages(reversedMessages);
        setSkip(data.data.skip);
        setLoadingGettingMessages(false);
        console.log({data});
        

      })
      .catch(error => {
        setLoadingGettingMessages(false);
        console.log({error});
      })
      
    }
    
    if (!activeConversation._id) {
      return setLoadingGettingMessages(false);
    }

    fetchData();

  }, [activeConversation._id, url])

  useEffect(() => {
    console.log({isAtTop});
  }, [isAtTop])

    useEffect(() => {
    
    console.log({isAtTop});
    
    if (!isAtTop) return;

    setLoadingGettingOldestMessages(true);

    const fetchData = async () => {

      axios.get(url + '/getConversationSlice', {
        params: {
          conversationId: activeConversation._id,
          skip: skip
        }
      })
      .then(data => {
        console.log({
          skip,
          restOfMessages: data
        });
        
        const reversedMessages = data.data.slice.reverse();
        console.log({reversedMessages});
        
        setIsAtTop(false);

        setMessages( prev => [
          ...prev,
          ...reversedMessages
        ]);

        setSkip(data.data.skip);

        setLoadingGettingOldestMessages(false);

      })
      .catch(err => {
        console.log({err});
      })
      
    }

    fetchData();

  }, [isAtTop])

    useEffect(() => {

    socketRef.current.on('update-conversation', (data) => {
      setConversations(prev => {
        if (!prev) return [];
        const updatedConversations = prev.map(conversation => {
          if (conversation._id === data.updatedConversation._id) {
            return data.updatedConversation;
          }
          return conversation;
        });
        return updatedConversations;
      });
    });

    return () => {
      socketRef.current.off('update-conversation');
    };
  }, []);

  return (

      <SafeAreaView className={` w-full h-full bg-whiteScale-400 dark:bg-blackScale-400`}>

        <CustomSwiper
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        >

          <SideBar
            navigation={navigation}
            isSideBarActive={isSideBarActive}
            setIsSideBarActive={setIsSideBarActive}
            conversations={conversations}
            setConversations={setConversations}
            activeConversation={activeConversation}
            setActiveConversation={setActiveConversation}
          />

          <ChatScreen
            isSideBarActive={isSideBarActive}
            setIsSideBarActive={setIsSideBarActive}
            navigation={navigation}
            activeConversation={activeConversation}
            setActiveConversation={setActiveConversation}
            messages={messages}
            setMessages={setMessages}
            loadingGettingMessages={loadingGettingMessages}
            setLoadingGettingMessages={setLoadingGettingMessages}
            loadingGettingOldestMessages={loadingGettingOldestMessages}
            setLoadingGettingOldestMessages={setLoadingGettingOldestMessages}
            isAtTop={isAtTop}
            setIsAtTop={setIsAtTop}
          />

        </CustomSwiper>

      </SafeAreaView>

  );
}

export default Home; 