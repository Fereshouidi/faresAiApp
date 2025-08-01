import { StatusBar } from 'expo-status-bar';
import { Text, View, Platform, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import Swiper from "react-native-swiper";

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WelcomeProps } from '@/types';
import { useContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOnboardingData } from '@/constent';

import '@/global.css';
import Button from '@/components/Button';
import BlurredImage from '@/components/blurredImage';
import { LanguageContext, UserTokenContext } from '@/contexts';
import SpaceBackground from '@/components/spaceBackground';


const Welcome = ({ navigation }: WelcomeProps) => {

    const activeLanguage = useContext(LanguageContext)?.activeLangue;
    // const [userToken, setUserToken] = useState<string | undefined>(undefined);
    // const userToken = useContext(UserTokenContext)?.userToken;
    // const setUserToken = useContext(UserTokenContext)?.setUserToken;
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isLastSlide, setIsLastSlide] = useState<boolean>(false);
    const swiperRef = useRef<Swiper>(null);


  useEffect(() => {
    
    if (activeIndex == getOnboardingData(activeLanguage).length -1) {
      setIsLastSlide(true);
    } else {
      setIsLastSlide(false);
    }

  }, [activeIndex])



            // await AsyncStorage.setItem('userToken', userToken);


  return (
      <SafeAreaView className={` w-full h-full bg-whiteScale-100 dark:bg-blackScale-100`}>

        <SpaceBackground/>
        
        <View
          className='w-full h-full'
          style={{zIndex: 100}} 
        >

          <Swiper 
              ref={swiperRef}
              loop={false}
              dot={<View className="w-[10px] h-[10px] mx-1 bg-blackScale-100 dark:bg-whiteScale-100 rounded-full" />}
              activeDot={<View className="w-[10px] h-[10px] mx-1 bg-[#0286FF] rounded-full" />}
              onIndexChanged={(index) => setActiveIndex(index)}
              className='w-full py-10 '
              
          >
              {getOnboardingData(activeLanguage).map((item, index) => {
                  return ( 
                      <View 
                        className="w-full h-full flex items-center" 
                        key={item.id}
                      >
                          <BlurredImage 
                            source={item.image}
                            className='w-[250px] h-[250px]'
                            imageClassName='w-[250px] h-[250px]'
                            opacity={1}
                            style={{zIndex: 100}}
                          />
                          <View className="flex flex-row items-center justify-center w-full mt-10">
                              <Text className="text-blackScale-900 dark:text-whiteScale-900 text-2xl font-bold mx-10 text-center">{item.title}</Text>
                          </View>
                          <Text className="text-lg font-JakartaBold text-center text-blackScale-800 dark:text-whiteScale-800 mx-10 mt-10">{item.description}</Text>
                      </View>
                  )
              })}
          </Swiper>

          <View className="flex flex-row items-center justify-center w-full px-5 my-5">

              <Button 
                  tittle={isLastSlide ? activeLanguage?.getStarted : activeLanguage?.next}
                  onPress={() => isLastSlide ? 
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'home' }],
                    }) : 
                    swiperRef.current?.scrollBy(1)
                  }
                  // className="m-4"
                  isWork={true}
              />

          </View>
          
        </View>

        
      </SafeAreaView>
  );
}

export default Welcome; 

