import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import InputField from '@/components/InputField';
import { useCallback, useContext, useEffect, useState } from 'react';
import { LanguageContext, UserTokenContext } from '@/contexts';
import Button from '@/components/Button';
import BlurredImage from '@/components/blurredImage';
import SpaceBackground from '@/components/spaceBackground';
import { SignInFormParams, SignInProps, SignInStatusParams, UserParams } from '@/types';
import { getUserBySignIn, url } from '@/api/crud';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '@/components/Loader';
import Video from 'react-native-video';
import LottieView from 'lottie-react-native';
import LoadingScreen from '@/components/loadingScreen';
import Banner from '@/components/statusBanner';
import StatusBanner from '@/components/statusBanner';
import axios, { AxiosError } from 'axios';
import { checkEmail } from '@/constent';

const SignIN = ({ navigation }: SignInProps) => {

  const [signInForm, setSignInForm] = useState<SignInFormParams>({email: undefined, password: undefined});
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');

  const activeLanguage = useContext(LanguageContext)?.activeLangue;
  const theme = useColorScheme(); 
  const isDark = theme === 'dark';
  const isArabic = activeLanguage?.activeLanguage == 'ar';
  const [loading, setLoading] = useState<boolean>(false);
  const [signInStatus, setSignInStatus] = useState<'success' | 'fail'>('fail');
  const [bannerVisibility, setBannerVisibility] = useState<boolean>(false);
  const [bannerText, setBannerText] = useState<string>('');
  const setUserToken = useContext(UserTokenContext)?.setUserToken;

  useEffect(() => {
    console.log(signInForm);
  }, [signInForm])

  const handleSignIn = async () => {
  
    if (!signInForm.email || !signInForm.password) {
      setSignInStatus('fail');
      setBannerText(activeLanguage?.emailAndPasswordRequired ?? '');
      setBannerVisibility(true);
      return;
    }

    const isValidEmail = checkEmail(signInForm.email);

    if (!isValidEmail) {
      setSignInStatus('fail');
      setBannerText(activeLanguage?.emailNotValid ?? '');
      setBannerVisibility(true);
      return;
    }

    setLoading(true);

    let res = null;

    try {

        res = await axios.get(`${url}/getUserBySignIn`, {
          params: {
            email: signInForm.email, 
            password: signInForm.password
          }
        });

        if (res.data.user) {

          const userToken = res.data.user.token
          setSignInStatus('success');
          setBannerText(activeLanguage?.signedInSuccessfully?? "");
          setTimeout(() => {
            navigation.navigate('welcome');
          }, 2000)
          await AsyncStorage.setItem('userToken', userToken);
          setUserToken && setUserToken(userToken);
          
        }

    } catch (err) {

        if (!axios.isAxiosError(err)) {
          throw {err}
        }
                    
        if (err.status == 404) {

          setSignInStatus('fail');
          setBannerText(activeLanguage?.accountNotExist?? "");

        }else if (err.status == 401) {

          setSignInStatus('fail');
          setBannerText(activeLanguage?.passwordNotCorrect?? "");

        }

    }

      setLoading(false);
      setBannerVisibility(true);
    
  }

  if (!activeLanguage) {
    return <View className='w-full '>
      <Text className='text-red-500'>activeLanguage is undefined !</Text>
    </View>
    
  }



  return (
    <>
    
      <SafeAreaView 
        className={` w-full h-full bg-whiteScale-100 dark:bg-blackScale-100 flex flex-col items-center`}
      >

      <SpaceBackground/>

      {bannerVisibility && <StatusBanner
        status={signInStatus}
        text={bannerText} 
        visibility={bannerVisibility}
        setVisibility={setBannerVisibility}
      />}

      {loading && <LoadingScreen/>}

      <View 
        className='w-full h-full absolute to-0 left0 flex justify-center items-center'
      >


      </View>

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

          <Text className='text-blackScale-900 dark:text-whiteScale-900 mt-32 mb-28 font-bold text-3xl'>{activeLanguage.signIn}</Text>

          <View className='w-[90%] rounded-lg flex justify-center items-center'>

            <InputField
              tittle={activeLanguage?.name}
              placeholder={activeLanguage?.enterYourName + '...'}
              icon={isDark? require('@/assets/userWhite.png') : require('@/assets/userBlack.png')}
              value={signInForm.email}
              onChangeText ={e => setSignInForm(prev => ({ ...prev, email: e }))}
              type='email-address'
            />

            <InputField
              tittle={activeLanguage?.password}
              placeholder={activeLanguage?.enterYourPassword + '...'}
              icon={isDark? require('@/assets/passwordWhite.png') : require('@/assets/passwordBlack.png')}
              onChangeText ={e => setSignInForm(prev => ({ ...prev, password: e }))}
            />

            <Button
              tittle={activeLanguage?.signIn}
              isWork={true}
              onPress={handleSignIn}
            />

            <View 
              className='flex flex-row items-center justify-center m-7'
              style={{direction: isArabic? 'rtl': 'ltr'}}  
            >

              <Text className='text-blackScale-900 dark:text-whiteScale-900'>{activeLanguage.DontHaveAnAccount}</Text>
                
                <TouchableOpacity
                  onPress={() => navigation.navigate('signUp')}
                >
                  <Text className='text-primaryColor-500'>{' ' + activeLanguage.signUp}</Text>
                </TouchableOpacity>
              
            </View>
            
        </View>

          
        </View>

        </ScrollView>

      </SafeAreaView>
    </>
  );
}

export default SignIN; 