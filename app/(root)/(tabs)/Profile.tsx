import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { profilePage, profileSections } from "@/constants/profilePage";
import TouchableFeildWithIcon from "@/components/Profile/TouchableFeildWithIcon";
import { Platform } from "react-native";
import useAuthStore from "@/store/useAuthStore";
import { SafeAreaView } from "react-native-safe-area-context";

const profile = () => {
  const { language, logout, user } = useAuthStore();
  const fieldTranslator = profilePage[language];
  const SecTranslator = profileSections[language];

  console.log(user);

  return (
    <SafeAreaView className="flex-1 rt bg-[#FEFEFE]">
      <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingTop: 9 }}>
        <View className="items-center justify-center h-full w-full gap-6">
          {user && (
            <>
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
                    pathName="/screens/Auth/SelectUsersDocs"
                  />
                  <TouchableFeildWithIcon
                    icon={fieldTranslator.address.icon}
                    title={fieldTranslator.address.title}
                    pathName="/screens/profilePage/Address"
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
            </>
          )}

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
                pathName="/screens/profilePage/Languages"
              />
              <TouchableFeildWithIcon
                icon={fieldTranslator.generalInfo.help.icon}
                title={fieldTranslator.generalInfo.help.title}
                pathName="/(root)/Home"
              />
            </View>
          </View>
        </View>
        {user && (
          <TouchableOpacity className="p-2 mx-auto" onPress={logout}>
            <Text
              className={`text-primary-400 ${language == "ar" ? "font-ZainRegular" : "font-MontserratMedium"}`}
            >
              {profileSections[language].buttonT}
            </Text>
          </TouchableOpacity>
        )}
        {!user && (
          <TouchableOpacity
            className="p-2 mx-auto"
            onPress={() => router.replace("/(auth)/sign-in")}
          >
            <Text
              className={`text-primary-400 ${language == "ar" ? "font-ZainRegular" : "font-MontserratMedium"}`}
            >
              {profileSections[language].usernull}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
