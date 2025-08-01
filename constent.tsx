import { View, Text, useColorScheme } from "react-native";
import Banner from "./components/statusBanner";
import LottieView from "lottie-react-native";
import { useContext } from "react";
import { LanguageContext } from "./contexts";
import eng from '@/language/english.json';
import ar from '@/language/arabic.json';
import { ActiveModelProps, ConversationParams, MessageParams, OnboardingParams } from "./types";


export const colors = {
  transparent: "#ffffff00",
  whiteScale: {
    10: "#d0d0d0",
    12: "#c0c0c0",
    100: '#e4e4e4',
    200: '#d9d9d9',
    300: '#cccccc',
    400: '#bfbfbf',
    500: '#b3b3b3',
    600: '#a6a6a6',
    700: '#999999',
    800: '#8c8c8c',
    900: '#ffffff'
  },
  blackScale: {
    10: '#2a2a2a',
    12: '#363636',
    100: '#1a1a1a',
    200: '#141414',
    300: '#0f0f0f',
    400: '#0a0a0a',
    500: '#050505',
    600: '#030303',
    700: '#020202',
    800: '#010101',
    900: '#000000',
  },
  whiteAlpha: {
    10: 'rgba(255,255,255,0.01)',
    50: 'rgba(255,255,255,0.05)',
    100: 'rgba(255,255,255,0.1)',
    200: 'rgba(255,255,255,0.2)',
    300: 'rgba(255,255,255,0.3)',
    400: 'rgba(255,255,255,0.4)',
    500: 'rgba(255,255,255,0.5)',
    600: 'rgba(255,255,255,0.6)',
    700: 'rgba(255,255,255,0.7)',
    800: 'rgba(255,255,255,0.8)',
    900: 'rgba(255,255,255,0.9)',
  },
  blackAlpha: {
    10: 'rgba(0,0,0,0.01)',
    50: 'rgba(0,0,0,0.05)',
    100: 'rgba(0,0,0,0.1)',
    200: 'rgba(0,0,0,0.2)',  
    300: 'rgba(0,0,0,0.3)',  
    400: 'rgba(0,0,0,0.4)',  
    500: 'rgba(0,0,0,0.5)',  
    600: 'rgba(0,0,0,0.6)',  
    700: 'rgba(0,0,0,0.7)',  
    800: 'rgba(0,0,0,0.8)',  
    900: 'rgba(0,0,0,0.9)',
  },
  primaryColor: {
    100: "#D7E9FB",
    200: "#A5CDF8",
    300: "#73B1F5",
    400: "#4195F1",
    500: "#1581DD",
    600: "#126BB9",
    700: "#0E5595",
    800: "#0B3F71",
    900: "#07294D"
  },
  primaryColorAlpha: {
    100: 'rgba(21, 129, 221, 0.1)',
    200: 'rgba(21, 129, 221, 0.2)',
    300: 'rgba(21, 129, 221, 0.3)',
    400: 'rgba(21, 129, 221, 0.4)',
    500: 'rgba(21, 129, 221, 0.5)',
    600: 'rgba(21, 129, 221, 0.6)',
    700: 'rgba(21, 129, 221, 0.7)',
    800: 'rgba(21, 129, 221, 0.8)',
    900: 'rgba(21, 129, 221, 0.9)',
  },
};

export const checkEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.toLowerCase());
};


export const getOnboardingData = (texts: typeof ar | typeof eng | undefined) => [
  {
    id: 0,
    title: texts?.welcomeTitle,
    image: require('@/assets/welcome0.png'),
    description: texts?.welcomeDescription,
  },
  {
    id: 1,
    title: texts?.memory,
    image: require('@/assets/memorizing.png'),
    description: texts?.memoryDescription,
  },
  {
    id: 2,
    title: texts?.abilitys,
    image: require('@/assets/memorizing.png'),
    description: texts?.abilitysDescription,
  }
] as OnboardingParams[];

export const models = [
  {
    id: 1,
    name: 'fares-1.5-pro',
    model: 'gemini-1.5-pro'
  },
  {
    id: 2,
    name: 'fares-2.0',
    model: 'gemini-2.0-flash'
  },
  {
    id: 0,
    name: 'default',
    model: 'gemini-2.5-flash'
  },
  {
    id: 3,
    name: 'memorizing',
    model: 'gemini-2.5-pro'
  },
  {
    id: 4,
    name: 'thinking',
    model: 'gemini-2.5-pro'
  }
] as ActiveModelProps[]

export const newConversation = {
  _id: '',
  title: 'New Conversation'
} as ConversationParams

export const createNewMessage = (message: string, id?: string) => {

  return {
      _id: id || Math.random().toString(36).substring(7),
      conversation: Math.random().toString(36).substring(7),
      role: "user",
      parts: [{text: message}],
      type: "text",
      createdAt: new Date(),
      updatedAt: new Date()
    }  as MessageParams;
}
