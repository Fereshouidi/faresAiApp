import { InputTextParams } from '@/types'
import React, { memo, useContext } from 'react'
import { View, Text, Image, TextInput, useColorScheme } from 'react-native';
import { LanguageContext } from '@/contexts';

const InputField = ({
    tittle,
    className,
    inputClassName,
    tittleClassName,
    placeholder,
    icon,
    iconClassname,
    type,
    numberOfLines,
    ref,
    value,
    setValue,
    onChangeText ,
}: InputTextParams) => {

  const theme = useColorScheme(); 
  const isDark = theme === 'dark';
  const activeLanguage = useContext(LanguageContext)?.activeLangue;
  const isArabic = activeLanguage?.activeLanguage == "ar";
  
  return (
    <View 
      className={`w-full p-4 flex flex-col rounded-3xl `}
      style={{direction: isArabic? 'rtl': 'ltr'}}
    >

        <Text
            className={`text-blackScale-900 dark:text-whiteScale-900 font-bold mb-4 mx-2 self-start py-1 rounded-full`}
        >{tittle + ' : '}</Text>

        <View className='w-full h-14'>

          <TextInput 
              placeholder={placeholder}
              className={`bg-whiteScale-10 dark:bg-blackScale-10 text-blackScale-900 dark:text-whiteScale-900 w-full h-full px-5 rounded-full ${isArabic? "text-right rtl" : "text-left"}`}
              style={{
                paddingRight: isArabic ? 20 : 50,
                paddingLeft: isArabic ? 50 : 20
              }}
              placeholderTextColor={isDark? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"}
              numberOfLines={numberOfLines}
              keyboardType={type}
              // value={value}
              autoComplete="off"
              onChangeText={onChangeText}
              ref={ref}
          />

          {icon && <Image
            source={icon}
            className={`w-6 h-6 absolute top-[50%] translate-y-[-50%]  ${isArabic? 'left-0' : 'right-0'} mx-4 ${iconClassname}`}

          />}


        </View>


    </View>
  )
}

export default memo(InputField);
