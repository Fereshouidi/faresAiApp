import { url } from '@/api/crud';
import { LanguageContext, StatusBannerContext } from '@/contexts';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, useColorScheme, ScrollView, TouchableOpacity, Pressable, TouchableWithoutFeedback, TextInput, FlatList } from 'react-native';
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
  const setStatusBanner = useContext(StatusBannerContext);
  const userData = useContext(UserContext);
  const [limit, setLimit] = useState<number>(12);
  const [skip, setskip] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeOptions, setActiveOptions] = useState<string | null>(null);
  const [conversationToEdit, setConversationToEdit] = useState<string | null>(null);
  const [updatedConversationTitle, setUpdatedConversationTitle] = useState<string |null>(null);
  const [filterInput, setFilterInput] = useState<string>('');
  const [conversationsFilter, setConversationsFilter] = useState<ConversationParams[] | undefined>(conversations);
  const [isOnBottom, setIsOnBottom] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [userConversationsLength, setUserConversationsLength] = useState<number>(NaN);

  useEffect(() => {
    console.log({userConversationsLength});
    
  }, [userConversationsLength])

  useEffect(() => {

    const fetchData = async () => {
      
      if (!loadingMore) return; 

      setLoadingMore(true)

      socket.emit('get-conversations', { 
        userId: userData?._id,
        limit,
        skip
      });

      socket.on('get-conversations-response', (data) => {
        const conversations_ = data.conversations as ConversationParams[];
        console.log({conversations_});
        if (conversations_) {
          setConversations([...(conversations ?? []), ...conversations_]);
          setskip(data.skip);
          setUserConversationsLength(data.userConversationsLength);
          setLoadingMore(false);
          setLoading(false);
        } else {
          console.log('no conversations returned, data = ', data);
        }
        setIsOnBottom(false);
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
    console.log('b');
    

  }, [userData?._id, conversations?.length, loadingMore])

  useEffect(() => {
    if (isOnBottom && conversations?.length != userConversationsLength) {
      setLoadingMore(true);
    } else {
      setLoadingMore(false);
    }
  }, [isOnBottom])

  useEffect(() => {

    const fetchData = async () => {

      socket.on('add-conversation', (data) => {
        console.log({newConversation: data});
        
        const newConversation = data.newConversation as ConversationParams;
        if (newConversation && conversations) {
          setConversations([newConversation, ...conversations]);
          setActiveConversation(newConversation);
          setLoading(false);
        }
      });

    }
    fetchData();

  }, [activeConversation?._id, conversations?.length])

  useEffect(() => {
    setConversationsFilter(conversations)
  }, [conversations])

  useEffect(() => {
    const searchTerm = filterInput.toLowerCase();

    const filtered = conversations?.filter((conversation) =>
      conversation.title?.toLowerCase().includes(searchTerm)
    );

    setConversationsFilter(filtered || []);
  }, [filterInput, conversations])

  useEffect(() => {
    setUpdatedConversationTitle(null);
  }, [conversationToEdit])


  const handleEditDone = async () => {
      setLoading(true);
      try {
          const response = await axios.patch(url + '/editConversation', {updatedData: {
            _id: conversationToEdit,
            title: updatedConversationTitle
          }} );
          if (response.status == 201) {
              setStatusBanner(true, 'conversation has been updated successfully', 'success');
              conversations && setConversations(conversations?.map((c) => {
                return c._id == conversationToEdit ? 
                  response.data.updatedConversation :
                  c 
              }))
          } else {
              setStatusBanner(true, 'something went wrong !', 'fail');
          }
      } catch (err) {
          setStatusBanner(true, String(err), 'fail');
      }
      setLoading(false)
      setConversationToEdit(null);
  }

  return (
    <TouchableWithoutFeedback 
      onPress={() => {
        setActiveOptions(null);
        setConversationToEdit(null)
      }}
    >
      <View 
        className='w-[300px] h-full flex justify-between bg-whiteAlpha-800 dark:bg-blackAlpha-800'
        style={{
          boxShadow: isDark ? `0px 5px 15px ${colors.whiteAlpha[50]}` : `0 5px 15px ${colors.blackAlpha[50]}`
        }}
      >

        <View className=' w-full flex-1'>
                
          <View className=' px-5 '>
            <Text className='text-blackScale-700 dark:text-whiteScale-700 px-5 m-4'>conversations :</Text>
            <View className='w-full relative flex justify-center'>
              <TextInput
                className={`bg-blackAlpha-100 dark:bg-whiteAlpha-100 text-blackScale-900 dark:text-whiteScale-900 rounded-full px-5 pr-12`}
                placeholder='Search...'
                placeholderTextColor={isDark ? colors.whiteAlpha[500] : colors.blackAlpha[500] }
                onChangeText={(e) => setFilterInput(e)}
              />
              <Image
                source={isDark ? require('@/assets/searchWhiteSemiTransparent.png') : require('@/assets/searchBlackSemiTransparent.png') }
                className='w-6 h-6 absolute right-3'
              />
            </View>
          </View>

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

            {(!conversations && filterInput) && !loading ?

              <View className='w-full h-full flew justify-center items-center'>
                <Text className='text-blackScale-800 dark:text-whiteScale-800'>{activeLanguage?.noConversation}</Text>
              </View>
                            
            : <FlatList
                className="w-full"
                data={conversationsFilter}
                keyExtractor={(conversation) => conversation._id ?? Math.random().toString()}
                onEndReached={() => setIsOnBottom(true)}
                renderItem={({ item: conversation }) => (
                  conversationToEdit === conversation._id ? (

                    <View 
                      className='w-full flex flex-row items-center justify-center rounded-full px-2'
                    >
                      <View className='w-[90%] flex justify-center relative mt-1'>
                        <TextInput
                          className='w-full h-full px-5 pr-20 flex items-center justify-center text-blackScale-900 dark:text-whiteScale-900 flex-1 bg-blackAlpha-100 dark:bg-whiteAlpha-100 rounded-full'
                          autoFocus
                          onChangeText={(e) => setUpdatedConversationTitle(e)}
                          value={updatedConversationTitle ?? conversation.title}
                        />
                        <TouchableOpacity
                          onPress={handleEditDone}
                          activeOpacity={0.6}
                          className='flex items-center justify-center bg-primaryColor-500 rounded-full m-2 w-14 h-[70%] absolute right-0'
                        >
                          <Text className=' text-white text-sm'>Done</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                  ) : (

                    <View 
                      className='w-full h-14 flex flex-row justify-between items-center m-2'
                    >
                      <TouchableOpacity 
                        className='h-full flex flex-1 justify-center px-5'
                        activeOpacity={0.6}
                        onPress={() => {
                          setActiveConversation(conversation);
                          setIsSideBarActive(false);
                        }}
                        onLongPress={() =>
                          setActiveOptions(
                            activeOptions === (conversation._id ?? null)
                              ? null
                              : (conversation._id ?? null)
                          )
                        }
                      >
                        <Text className='Text-blackScale-900 dark:text-whiteScale-900'>
                          {conversation?.title?.length && conversation?.title?.length < 30
                            ? conversation.title
                            : conversation.title?.slice(0, 20) + ' ...'}
                        </Text>

                        <View className='w-full flex flex-row justify-start gap-2 m-1 '>
                          <Text className='text-blackAlpha-500 dark:text-whiteAlpha-500 text-[12px]'>
                            {conversation.createdAt
                              ? formatSmartDate(conversation.createdAt)
                              : '...'}
                          </Text>

                          <Text className='text-blackAlpha-500 dark:text-whiteAlpha-500 text-[11px]'>
                            {conversation.length + ' MS'}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <View className='w-14 h-14 relative overflow-visible'>
                        <TouchableOpacity
                          className='w-14 h-14 flex justify-center items-center p-2 rounded-full'
                          onPress={() =>
                            setActiveOptions(
                              activeOptions === conversation._id
                                ? null
                                : (conversation._id ?? null)
                            )
                          }
                        >
                          <Image
                            source={
                              isDark
                                ? require('@/assets/optionsWhite.png')
                                : require('@/assets/optionsBlack.png')
                            }
                            className='w-4 h-4'
                          />
                        </TouchableOpacity>

                        {activeOptions === conversation._id && (
                          <ConversationOptions
                            conversation={conversation}
                            allConversations={conversations ?? []}
                            setAllConversations={setConversations}
                            activeConversation={activeConversation}
                            setActiveConversation={setActiveConversation}
                            conversationToEdit={conversationToEdit}
                            setConversationToEdit={setConversationToEdit}
                            activeOptions={activeOptions}
                            setActiveOptions={setActiveOptions}
                          />
                        )}
                      </View>
                    </View>
                  )
                )}
              />
            }
            {loadingMore && <View className='w-full flex items-center'>
              <LottieView
                source={require('@/assets/loading.json')}
                autoPlay
                loop
                style={{ width: 50, height: 50, }}
              />
            </View>
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
