import SpaceBackground from '@/components/spaceBackground'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import SignIN from './auth/SignIn';
import { RgisterParams } from '@/types';
import SignUp from './auth/SignUp';

const Register = ({navigation}: RgisterParams) => {

    const [activePage, setActivePage] = useState<"signIn" | "signUp">("signIn");

    return (
    <SafeAreaView className='w-full h-full bg-whiteScale-100 dark:bg-blackScale-100'>
        <SpaceBackground/>
        {activePage == "signIn" && <SignIN navigation={navigation}/>}
        {activePage == "signUp" && <SignUp navigation={navigation}/>}
    </SafeAreaView>
    )
}

export default Register
