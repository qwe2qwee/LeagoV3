import { View, Text } from "react-native";
import React, { useState } from "react";
import { profilePage, profileSections } from "@/constants";
import { router } from "expo-router";
import TouchableFeildWithIcon from "@/components/profile/TouchableFeildWithIcon";

type Language = "en" | "ar";

const profile = () => {
  const [language, setLanguage] = useState<Language>("ar");
  const fieldTranslator = profilePage[language];
  const SecTranslator = profileSections[language];

  return (
    <View className="items-center justify-center h-full w-full gap-6">
      <View className="itmes-center justify-center">
        <Text className="text-sm pr-10 py-2.5 font-ZainBold">
          {SecTranslator.account}
        </Text>
        <View className="w-80 mx-10">
          <TouchableFeildWithIcon
            icon={fieldTranslator.personalInfo.icon}
            title={fieldTranslator.personalInfo.title}
            pathName="/screens/profilePage/PersonalInfo"
          />
          <TouchableFeildWithIcon
            icon={fieldTranslator.documents.icon}
            title={fieldTranslator.documents.title}
            pathName="/(root)/Home"
          />
          <TouchableFeildWithIcon
            icon={fieldTranslator.address.icon}
            title={fieldTranslator.address.title}
            pathName="/(root)/Home"
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
            pathName="/(root)/Home"
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
            pathName="/(root)/Home"
          />
          <TouchableFeildWithIcon
            icon={fieldTranslator.generalInfo.languages.icon}
            title={fieldTranslator.generalInfo.languages.title}
            pathName="/(root)/Home"
          />
          <TouchableFeildWithIcon
            icon={fieldTranslator.generalInfo.help.icon}
            title={fieldTranslator.generalInfo.help.title}
            pathName="/(root)/Home"
          />
        </View>
      </View>
    </View>
  );
};

export default profile;
