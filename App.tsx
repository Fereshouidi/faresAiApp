import React, { createContext, useEffect, useState } from "react";
import { View, Text, Touchable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";
import Welcome from "@/(root)/auth/welcome";
import SignUp from "./(root)/auth/SignUp";
import SignIn from "./(root)/auth/SignIn";
import Home from "./(root)/Home";
import { createNavigationContainerRef, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getUserBySignIn, url } from "./api/crud";
import { StatusBar } from "expo-status-bar";
import { LanguageContext, UserTokenContext } from "./contexts";
import eng from '@/language/english.json';
import ar from '@/language/arabic.json';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Register from "./(root)/register";
import SpaceBackground from "./components/spaceBackground";
import LoadingScreen from "./components/loadingScreen";
import useKeyboardHeight from "./helper/useKeyboardHeight";
import axios from "axios";
import { UserContext } from "./contexts";
import { RootStackParamList, StatusBannerParams, UserParams } from "./types";
import { StackNavigationProp } from "@react-navigation/stack";
import Setting from "./(root)/setting";
import { StatusBannerContext } from "./contexts";
import { LoadingScreanContext } from "./contexts";
import StatusBanner from "./components/statusBanner";
import SplashScreen from "./components/splashScreen";

const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();

const App = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [userToken, setUserToken] = useState<string | undefined>(undefined);
  const [userData, setUserData] = useState<UserParams | undefined>(undefined);
  const [activeLanguage, setActiveLanguage] = useState<typeof eng | typeof ar>(eng);
  const keyboardHeight = useKeyboardHeight();

  const [statusBanner, setStatusBanner] = useState<StatusBannerParams>({});
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);
  const [splashScreen, setSplashScreenScreen] = useState<boolean>(false);

  const handleStatusBanner = (
    visibility?:boolean,
    text?: string,
    status?: 'success' | 'fail' | 'exclamation'
  ) => {
    setStatusBanner({
      visibility,
      text,
      status,
  })
  }
    
  const handleLoadingScrean = (visibility: boolean) => {
    setLoadingScreen(visibility);
  }
  
  useEffect(() => {

    const fetchData = async () => {
      const res = await axios.get(url + `/getUserByToken`, {
        params: {token: userToken}
      });
      
      const user = res.data.user as UserParams;
      user && setUserData(user);
      
    }
    fetchData();
    

  }, [userToken])
  
  useEffect(() => {

    const fetchData = async () => {
      const userToken =  await AsyncStorage.getItem('userToken') || undefined;
      setUserToken(userToken);
      setLoading(false);
    }
    fetchData()

  }, [])

  // useEffect(() => {
  //   if (!userToken) {
  //     navigationRef.reset({
  //       index: 0,
  //       routes: [{ name: 'signIn' as never }],
  //     });
  //   }
  // }, [userToken, navigationRef]);


  // useEffect(() => {
  //   const removeData = async () => {
  //      await AsyncStorage.removeItem('userToken');
  //   }
  //   removeData()
  // }, [])

  // useEffect(() => {

  //   if (loading) {
  //     setSplashScreenScreen(true);
  //     setTimeout(() => {
  //         setSplashScreenScreen(false);
  //         setLoadingScreen(true);
  //     }, 2000)
  //   }

  // }, [loading])

  if (loading) {
    return <SplashScreen/>
  }

  if (!loading) {
      
      // setLoadingScreen(false);
      return (
        <View className="w-full h-full relative"  style={{paddingBottom: keyboardHeight}} >
        
          <View className={`w-full h-12 bg-whiteScale-400 dark:bg-blackScale-400`}/>

            <LoadingScreanContext.Provider value={handleLoadingScrean}>

              <StatusBannerContext.Provider value={handleStatusBanner}>

                <LanguageContext.Provider value={{activeLangue: activeLanguage, setActiveEnglish: setActiveLanguage}}>
                  
                  <UserTokenContext.Provider value={{userToken, setUserToken}}>
                    
                    <UserContext.Provider value={userData}>

                      <NavigationContainer ref={navigationRef}>

                        <Stack.Navigator initialRouteName= {userToken ? "home" : "signIn"}  screenOptions={{ headerShown: false }}>

                          <Stack.Screen name="home" component={Home} />
                          <Stack.Screen name="welcome" component={Welcome} />
                          <Stack.Screen name="setting" component={Setting} />
                          <Stack.Screen name="signUp" component={SignUp} />
                          <Stack.Screen name="signIn" component={SignIn} />
                        
                        </Stack.Navigator>

                      </NavigationContainer>

                    </UserContext.Provider>

                  </UserTokenContext.Provider>

                </LanguageContext.Provider>
                
              </StatusBannerContext.Provider>

            </LoadingScreanContext.Provider>

          <StatusBanner
            visibility={statusBanner?.visibility}
            text={statusBanner?.text}
            status={statusBanner?.status}
            onPress={() => handleStatusBanner(false)}
          />
          {loadingScreen && <LoadingScreen/>}

          {splashScreen && <SplashScreen/>}

          <StatusBar style="auto" />

        </View>
      );
  }

};

export default App;

