import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import eng from '@/language/english.json';
import ar from '@/language/arabic.json';
import { GestureResponderEvent, ImageSourcePropType, KeyboardTypeOptions, NativeSyntheticEvent, StyleProp, StyleSheet, TextInput, TextInputChangeEventData, View, ViewStyle } from "react-native";
import { ReactNode, Ref } from "react";

export interface ConversationParams {
    _id?: string,
    user: UserParams;
    title?: string;
    model: string;
    length?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserParams {
    _id?: string,
    name: string;
    familyName: string;
    email: string;
    password: string;
    token: string,
    createdAt?: Date;
    updatedAt?: Date;
}

export type messagePartsSchema = {
    text: string
    image: string | null
    audio: string | null
    video: string | null
    file: string | null
    toolCall: object | null
    toolResult: Object | null,
    toolError: Object | null,
    toolResponse: Object | null,
    toolResponseError: Object | null,
};

export interface MessageParams {
    _id?: string,
    role: string,
    parts: messagePartsSchema[]
    type: "primaryPrompt"| "primaryResponse"| "text"| "image"| "audio"| "video"| "file"| "toolCall"| "toolResult"| "toolError"| "toolResponse"| "toolResponseError",
    conversation: string
    createdAt: Date
    updatedAt: Date
}

export type RootStackParamList = {
  home: undefined;
  welcome: undefined;
  signUp: undefined;
  signIn: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type WelcomeProps = {
  navigation: NativeStackNavigationProp<any>;
};

export type SignUpProps = {
  navigation: NativeStackNavigationProp<any>;
};

export type SignInProps = {
  navigation: NativeStackNavigationProp<any>;
};

export type HmeProps = {
  navigation: NativeStackNavigationProp<any>;
};

export type RgisterParams = {
  navigation: NativeStackNavigationProp<any>;
};

export type HomeParams = {
  navigation: NativeStackNavigationProp<any>;
};

export interface ChatScreanParams {
  isSideBarActive: boolean,
  setIsSideBarActive: (value: boolean) => void
  navigation: NativeStackNavigationProp<any>;
  activeConversation: ConversationParams, 
  setActiveConversation: (value: ConversationParams) => void
  messages: MessageParams[],
  setMessages: (value: MessageParams[]) => void
  loadingGettingMessages: boolean, 
  setLoadingGettingMessages: (value: boolean) => void,
  loadingGettingOldestMessages: boolean, 
  setLoadingGettingOldestMessages: (value: boolean) => void
  isAtTop: boolean,
  setIsAtTop: (value: boolean) => void
}

export type SideBarProps =  {
  navigation: NativeStackNavigationProp<any>;
  isSideBarActive: boolean,
  setIsSideBarActive: (value: boolean) => void
  activeConversation: ConversationParams, 
  setActiveConversation: (value: ConversationParams) => void
  conversations: ConversationParams[] | undefined, 
  setConversations: (value: ConversationParams[]) => void
}


export type HeaderParams = {
    className?: string
    isSideBarActive: boolean
    setIsSideBarActive: (value: boolean) => void
    activeConversation: ConversationParams
    setActiveConversation: (value: ConversationParams) => void
    style?: StyleProp<ViewStyle>
}



export interface InputTextParams {
    tittle?: string,
    className?: string,
    inputClassName?: string,
    tittleClassName?: string,
    placeholder?: string,
    icon?: ImageSourcePropType ,
    iconClassname?: string,
    type?: KeyboardTypeOptions,
    numberOfLines?: number,
    ref?: Ref<TextInput>,
    value?: string,
    setValue?: (text: string) => void,
    onChangeText?: (text: string) => void
}

export interface LanguageContextParams {
    activeLangue: typeof eng | typeof ar,
    setActiveEnglish: (value: typeof eng | typeof ar) => void
}

export interface ButtonParams {
    tittle?: string,
    icon?: ImageSourcePropType,
    onPress?: ((event: GestureResponderEvent) => void) | undefined,
    className?: string,
    textClassName?: string,
    isWork: boolean,
}

export interface SignInFormParams {
    email?: string,
    password?: string
}

export interface StatusBannerParams {
    visibility?: boolean,
    text?: string,
    status?: 'success' | 'fail' | 'exclamation',
}

export interface StatusBannerParams_ {
    className?: string;
    text?: string;
    visibility?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
    status?: 'success' | 'fail' | 'exclamation';
}

export interface StatusBannerContextParams {
    // banner: StatusBannerParams,
    setBanner: (visibility?: boolean, text?: string, status?: 'success' | 'fail' | 'exclamation') => void
}

export interface LoadingScreanContextParams {
    // banner: StatusBannerParams,
    setBanner: (visibility?: boolean, text?: string, status?: 'success' | 'fail' | 'exclamation') => void
}

export type SignInStatusParams =
  | 'success'
  | 'invalidEmail'
  | 'invalidPassword'
  | 'passwordNotCorrect'
  | 'userNotFound'
  | 'accountBlocked'
  | 'accountNotVerified'
  | 'tooManyAttempts'
  | 'networkError'
  | 'serverError'
  | 'unknownError'
  | 'missingCredentials'
  | null;

export interface BlurredImageParams { 
  source?: ImageSourcePropType, 
  className?: string, 
  imageClassName?: string, 
  blurClassName?: string, 
  // intensity?: number, 
  // tint?: IntrinsicAttributes & (BlurViewProps & RefAttributes<View>)
  opacity?: number
  style?: StyleProp<ViewStyle>
}

export interface OnboardingParams {
  id: number,
  title?: string,
  image?: ImageSourcePropType
  description?: string,
}

export interface UserTokenContextParams {
  userToken?: string | undefined
  setUserToken?: (value: string | undefined) => void
}

export interface MessageComposerProps {
  activeModel: ActiveModelProps
  setActiveModel: (value: ActiveModelProps) => void
  userMessage: string, 
  setUserMessage: (value: string) => void
  messages: MessageParams[]
  setMessages: (value: MessageParams[]) => void
  activeConversation: ConversationParams
  isLoading: boolean,
  setIsLoading: (value: boolean) => void
  setMessageToWait: (value: string) => void
}

export type ActiveModelProps =  {
  id: number
  name: 'default' | 'fares-2.0' | 'fares-1.5-pro' | 'memorizing' | 'thinking'
  model: string
}

export type MessagesSectionParams =  {
  messages: MessageParams[] | undefined
  loadingGettingMessages: boolean, 
  setLoadingGettingMessages: (value: boolean) => void,
  loadingGettingOldestMessages: boolean, 
  setLoadingGettingOldestMessages: (value: boolean) => void
  isAtTop: boolean,
  setIsAtTop: (value: boolean) => void
  messageToWait: string
  isLoading: boolean
}

export type ConversationOptionsParams = {
  conversation: ConversationParams
  allConversations: ConversationParams[],
  setAllConversations: (value: ConversationParams[]) => void
  activeConversation: ConversationParams,
  setActiveConversation: (value: ConversationParams) => void
  conversationToEdit: string | null, 
  setConversationToEdit: (value: string | null) => void
  activeOptions: string | null
  setActiveOptions: (value: string | null) => void
}