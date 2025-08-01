import { StatusBar } from 'expo-status-bar';
import { Text, View, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import InputField from '@/components/InputField';
import { useContext } from 'react';
import { LanguageContext } from '@/contexts';
import Button from '@/components/Button';
import BlurredImage from '@/components/blurredImage';
import SpaceButton from '@/components/spaceBackground';
import SpaceBackground from '@/components/spaceBackground';
import { SignUpProps } from '@/types';
import Banner from '@/components/statusBanner';
import LottieView from 'lottie-react-native';

const SignUp = ({ navigation }: SignUpProps) => {

  const activeLanguage = useContext(LanguageContext)?.activeLangue;
  const theme = useColorScheme(); 
  const isDark = theme === 'dark';
  const isArabic = activeLanguage?.activeLanguage == 'ar';

  if (!activeLanguage) {
    return <View className='w-full '>
      <Text className='text-red-500'>activeLanguage is undefined !</Text>
    </View>
    
  }


  return (
    <>
    
      <SafeAreaView 
        className={` w-full h-full bg-whiteScale-100 dark:bg-blackScale-100 flex flex-col items-center`}
        // style={{zIndex: 100}}
      >

      <SpaceBackground/>

        <BlurredImage
          source={require('@/assets/faresAi.jpg')}
          className='w-full h-[45%]'
          imageClassName='w-full h-full'
          opacity={0.5}
        />

        <ScrollView 
          className='w-full h-full absolute top-0 z-100'
          style={{zIndex: 100}} 
        >
          <View 
            className='w-full h-full flex flex-col items-center'
          >

            <Text className='text-blackScale-900 dark:text-whiteScale-900 mt-20 mb-10 font-bold text-3xl'>{activeLanguage.signUp}</Text>

            <View className='w-[90%] rounded-lg flex justify-center items-center'>

              <InputField
                tittle={activeLanguage?.name}
                placeholder={activeLanguage?.enterYourName + '...'}
                icon={isDark? require('@/assets/userWhite.png') : require('@/assets/userBlack.png')}
              />

              <InputField
                tittle={activeLanguage?.familyName}
                placeholder={activeLanguage?.enterYourFamilyName + '...'}
                icon={isDark? require('@/assets/userWhite.png') : require('@/assets/userBlack.png')}
              />

              <InputField
                tittle={activeLanguage?.email}
                placeholder={activeLanguage?.enterYourEmail + '...'}
                icon={isDark? require('@/assets/emailWhite.png') : require('@/assets/emailBlack.png')}
              />

              <InputField
                tittle={activeLanguage?.password}
                placeholder={activeLanguage?.enterYourPassword + '...'}
                icon={isDark? require('@/assets/passwordWhite.png') : require('@/assets/passwordBlack.png')}
              />

              <Button
                tittle={activeLanguage?.signUp}
                isWork={true}
              />

              <View 
                className='flex flex-row items-center justify-center m-7'
                style={{direction: isArabic? 'rtl': 'ltr'}}  
              >

                <Text className='text-blackScale-900 dark:text-whiteScale-900'>{activeLanguage.AlreadyHaveAnAccout}</Text>
                  
                  <TouchableOpacity
                    onPress={() => navigation.navigate('signIn')}
                  >
                    <Text className='text-primaryColor-500'> {activeLanguage.signIn}</Text>
                  </TouchableOpacity>
                
              </View>

              
            </View>
          
          </View>
        
        </ScrollView>

      </SafeAreaView>
    </>
  );
}

export default SignUp; 