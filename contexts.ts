import { createContext } from "react";
import { LanguageContextParams, UserParams, UserTokenContextParams } from "./types";


export const LanguageContext = createContext<LanguageContextParams | undefined>(undefined);

export const UserTokenContext = createContext<UserTokenContextParams | undefined>(undefined);

export const UserContext = createContext<UserParams | undefined>(undefined);

// export const StatusBannerContext = createContext<StatusBannerContext | undefined>(undefined)