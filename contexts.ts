import { createContext } from "react";
import { LanguageContextParams, StatusBannerContextParams, UserParams, UserTokenContextParams, LoadingScreanContextParams } from "./types";


export const LanguageContext = createContext<LanguageContextParams | undefined>(undefined);

export const UserTokenContext = createContext<UserTokenContextParams | undefined>(undefined);

export const UserContext = createContext<UserParams | undefined>(undefined);

export const StatusBannerContext = createContext<(visibility?: boolean, text?: string, status?: 'success' | 'fail' | 'exclamation') => void>(() => {})

export const LoadingScreanContext = createContext<(visibility: boolean) => void>(() => {})