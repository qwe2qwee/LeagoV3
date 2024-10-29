import { View, Text } from "react-native";
import React, { useState } from "react";
<<<<<<< HEAD
import { profilePage } from "@/constants";
import TouchableFeildWithIcon from "@/components/Profile/TouchableFeildWithIcon";
=======
import { profilePage, profileSections } from "@/constants";
import TouchableFeildWithIcon from "@/components/profile/TouchableFeildWithIcon";
import { router } from "expo-router";
>>>>>>> c7aa46848e0e5074df0c6c14e6a640b012936501

type Language = "en" | "ar";

const profile = () => {
  const [language, setLanguage] = useState<Language>("ar");
  const fieldTranslator = profilePage[language];
  const SecTranslator = profileSections[language];

  return (
    <View className="items-center justify-center h-full w-full gap-6">
      <View className="itmes-center justify-center">
<<<<<<< HEAD
        <Text className="text-sm pr-10 py-2.5">ادارة الحساب</Text>
        <View className="w-80 mx-10">
          <TouchableFeildWithIcon
            icon={t.personalInfo.icon}
            title={t.personalInfo.title}
            pathName=""
          />
          <TouchableFeildWithIcon
            icon={t.documents.icon}
            title={t.documents.title}
            pathName=""
          />
          <TouchableFeildWithIcon
            icon={t.address.icon}
            title={t.address.title}
=======
        <Text className="text-sm pr-10 py-2.5 font-ZainBold">
          {SecTranslator.account}
        </Text>
        <View className="w-80 mx-10">
          <TouchableFeildWithIcon 
            icon={fieldTranslator.personalInfo.icon}
            title={fieldTranslator.personalInfo.title}
            pathName= {() => router.push("/screens/PersonalInfo")}
          />
          <TouchableFeildWithIcon 
            icon={fieldTranslator.documents.icon}
            title={fieldTranslator.documents.title}
            pathName=""
          />
          <TouchableFeildWithIcon 
            icon={fieldTranslator.address.icon}
            title={fieldTranslator.address.title}
            pathName=""
          />
        </View>
      </View>
      <View className="itmes-center justify-center">
        <Text className="text-sm pr-10 py-2.5 font-ZainBold">
          {SecTranslator.security}
        </Text>
        <View className="w-80 mx-10">
          <TouchableFeildWithIcon 
            icon={fieldTranslator.changePass.icon}
            title={fieldTranslator.changePass.title}
            pathName=""
          />
        </View>
      </View>
      <View className="itmes-center justify-center">
        <Text className="text-sm pr-10 py-2.5 font-ZainBold">
          {SecTranslator.general}
        </Text>
        <View className="w-80 mx-10">
          <TouchableFeildWithIcon 
            icon={fieldTranslator.generalInfo.notification.icon}
            title={fieldTranslator.generalInfo.notification.title}
            pathName=""
          />
          <TouchableFeildWithIcon 
            icon={fieldTranslator.generalInfo.languages.icon}
            title={fieldTranslator.generalInfo.languages.title}
            pathName=""
          />
          <TouchableFeildWithIcon 
            icon={fieldTranslator.generalInfo.help.icon}
            title={fieldTranslator.generalInfo.help.title}
>>>>>>> c7aa46848e0e5074df0c6c14e6a640b012936501
            pathName=""
          />
        </View>
      </View>
    </View>
  );
};

export default profile;
