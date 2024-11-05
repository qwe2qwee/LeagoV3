import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DropdownWithTitle from '@/components/Profile/DropdownWithTitle'
import InputFieldAddress from '@/components/Profile/InputFieldAddress'
import { address, pageTitle } from '@/constants/profilePage'

type Language = "en" | "ar";


const Address = () => {
  const [language, setLanguage] = useState<Language>("ar");
  const addressTranslator = address[language];
  const pageTitleTranslator = pageTitle[language];


  return (
    <SafeAreaView className='h-full bg-white'>
      <Text         className={`${language === "ar" ? "font-ZainExtraBold" : "font-MontserratBold"} mt-3 text-center text-lg text-[#272B3B] `}
      >{pageTitleTranslator.myAddress}</Text>
      <View className='items-center'>

      <InputFieldAddress 
        label={addressTranslator.country}
        labelStyle=''
        containerStyle='items-end justify-center w-80 h-12 mt-3 rounded-xl bg-[#F7F7F7]'
        inputStyle=''
        onChangeText={() => {}} 
      />
      <InputFieldAddress 
        label={addressTranslator.region}
        labelStyle=''
        containerStyle='items-end justify-center w-80 h-12 mt-3 rounded-xl bg-[#F7F7F7]'
        inputStyle=''
        onChangeText={() => {}} 
      />
      <InputFieldAddress 
        label={addressTranslator.city}
        labelStyle=''
        containerStyle='items-end justify-center w-80 h-12 mt-3 rounded-xl bg-[#F7F7F7]'
        inputStyle=''
        onChangeText={() => {}} 
      />
      <InputFieldAddress 
        label={addressTranslator.district}
        labelStyle=''
        containerStyle='items-end justify-center w-80 h-12 mt-3 rounded-xl bg-[#F7F7F7]'
        inputStyle=''
        onChangeText={() => {}} 
      />
      <InputFieldAddress 
        label={addressTranslator.street}
        labelStyle=''
        containerStyle='items-end justify-center w-80 h-12 mt-3 rounded-xl bg-[#F7F7F7]'
        inputStyle=''
        onChangeText={() => {}} 
      />
      <InputFieldAddress 
        label={addressTranslator.building}
        labelStyle=''
        containerStyle='items-end justify-center w-80 h-12 mt-3 rounded-xl bg-[#F7F7F7]'
        inputStyle=''
        onChangeText={() => {}} 
      />
      </View>

    </SafeAreaView>
  )
}

export default Address