import { MessagesSectionParams } from '@/types';
import React, { use, useEffect, useRef } from 'react'
import { View, Text, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent, FlatList } from 'react-native'
import LoadingScreen from './loadingScreen';
import LottieView from 'lottie-react-native';
import LoadingIcon from './loadingIcon';

const MessagesSection = ({
  messages,
  loadingGettingMessages, 
  setLoadingGettingMessages,
  loadingGettingOldestMessages, 
  setLoadingGettingOldestMessages,
  isAtTop, 
  setIsAtTop,
  messageToWait,
  isLoading
}: MessagesSectionParams) => {

  const flatListRef = useRef<FlatList>(null);

  return (
    <>
      
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        ref={flatListRef}
        inverted
        onEndReached={() => setIsAtTop(true)}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<View className='p-7' />}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item, index }) => (
          <View
            key={item._id}
            className={`
              p-4 
              ${item.role === 'user' ? 
                'max-w-[70%] bg-blackAlpha-100 dark:bg-whiteAlpha-100 m-2 rounded-2xl self-end' : 
                'w-full self-start'
              }`}
          >
            
            <Text className='text-blackScale-900 dark:text-whiteScale-900'>
              {item.parts[0]?.text}
            </Text>

          </View>
        )}
      />

      {
        (messageToWait || isLoading) &&
        <View className=' max-w-[90%] flex flex-row items-center px-10'>
          <LottieView
            source={require('@/assets/loading.json')}
            autoPlay
            loop
            style={{ width: 50, height: 50, }}
          />
          <Text className='text-blackAlpha-500 dark:text-whiteAlpha-500'>{messageToWait}</Text>

        </View>
      } 

      {loadingGettingMessages && <LoadingScreen/>}
      
      {messages?.length == 0 && !loadingGettingMessages &&               
        <View className='w-full h-full flex pt-10 items-center '>
          <LottieView
            source={require('@/assets/AISearching.json')}
            autoPlay
            loop
            style={{ width: 300, height: 300, }}
          />
          <Text className='text-blackScale-900 dark:text-whiteScale-900'>Hi, i'm FaresAi 😊</Text>
          <Text className='text-blackScale-800 dark:text-whiteScale-800 mt-2 mx-16 text-center'>How can i help you today ?</Text>
        </View>}
    </>
  )
}

export default MessagesSection;
