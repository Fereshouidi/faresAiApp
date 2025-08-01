import { Link, Redirect } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { Text, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import '@/global.css';
import Header from 'components/Header';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="index"
          component={() => <View><Text>Index Screen</Text></View>}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(root)"
          component={() => <View><Text>Root Screen</Text></View>}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)"
          component={() => <View><Text>Auth Screen</Text></View>}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="+not-found"
          component={() => <View><Text>Not Found</Text></View>}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
  // if (true) {
    // return <Redirect href="(root)" />;
  // }

  // <StatusBar style="light" />
}
