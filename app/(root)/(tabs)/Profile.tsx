import { View, Text } from "react-native";
import React, { useState } from "react";
import { profilePage } from "@/constants";
import TouchableFeildWithIcon from "@/components/profile/TouchableFeildWithIcon";

type Language = "en" | "ar";

const profile = () => {
  const [language, setLanguage] = useState<Language>("ar");
  const t = profilePage[language];
  return (
    <View className="items-center justify-center h-full w-full ">
      <View className="itmes-center justify-center">
      <Text className="text-sm pr-10 py-2.5">
        ادارة الحساب
      </Text>
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
          pathName=""
        />
      </View>
      </View>
    </View>
  );
};

export default profile;
