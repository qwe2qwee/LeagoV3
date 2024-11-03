import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import React, { useState } from "react";
import { profilePage, profileSections } from "@/constants/profilePage";
import TouchableFeildWithIcon from "@/components/Profile/TouchableFeildWithIcon";
import { Platform } from "react-native";

type Language = "en" | "ar";

const profile = () => {
  const [language, setLanguage] = useState<Language>("ar");
  const fieldTranslator = profilePage[language];
  const SecTranslator = profileSections[language];

  return (
    <SafeAreaView style={styles.droidSafeArea} >
      <View className="h-full w-full border-2 border-red-500 p-6">
        <View className="itmes-center justify-center">
        <Text className="text-sm font-ZainBold">
          {SecTranslator.account}
        </Text>
        <View className="pt-2">
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
            pathName="/screens/profilePage/Address"
          />
        </View>
        </View>
        <View className="itmes-center justify-center pt-6">
        <Text className="text-sm font-ZainBold">
          {SecTranslator.security}
        </Text>
        <View className="pt-2 ">
          <TouchableFeildWithIcon
            icon={fieldTranslator.changePass.icon}
            title={fieldTranslator.changePass.title}
            pathName="/(root)/Home"
          />
        </View>
        </View>
        <View className="itmes-center justify-center">
      </View>
        <Text className="text-sm font-ZainBold pt-6">
          {SecTranslator.general}
        </Text>
        <View className="pt-2">
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ?  StatusBar.currentHeight : 0
},
})

export default profile;
