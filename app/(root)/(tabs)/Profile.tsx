import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import {
  logOutModal,
  profilePage,
  profileSections,
} from "@/constants/profilePage";
import TouchableFeildWithIcon from "@/components/Profile/TouchableFeildWithIcon";
import useAuthStore from "@/store/useAuthStore";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";

const profile = () => {
  const { language, logout, user } = useAuthStore();
  const fieldTranslator = profilePage[language];
  const SecTranslator = profileSections[language];
  const logOutTranslator = logOutModal[language];

  const [open, setOpen] = useState(false);

  const handleOnPress = () => {
    setOpen(!open);
  };

  const handleLogOut = async() => {
    await logout()
    setOpen(false)
  }
  

  console.log(user);

  return (
    <SafeAreaView className="flex-1 rt bg-[#FEFEFE]">
      <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingTop: 9 }}>
        <View className="items-center justify-center h-full w-full">
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
            </>
          )}
          <View className="itmes-center justify-center mt-4">
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
                pathName="/screens/profilePage/TermsAndConditions"
              />
              <TouchableFeildWithIcon
                icon={fieldTranslator.generalInfo.help.icon}
                title={fieldTranslator.generalInfo.help.title}
                pathName="/screens/profilePage/ContactUs"
              />
            </View>
          </View>
        </View>
        {user && (
          <>
            <TouchableOpacity className="p-2 mx-auto" onPress={handleOnPress}>
              <Text
                className={`text-primary-400 ${language == "ar" ? "font-ZainRegular" : "font-MontserratMedium"}`}
              >
                {profileSections[language].buttonT}
              </Text>
            </TouchableOpacity>
            <Modal animationIn="slideInUp" coverScreen isVisible={open}>
              <View className="bg-white w-80 h-64 rounded-2xl">
                <View className="p-16 pb-8">
                  <Text className="text-center text-lg font-ZainBold">
                    {logOutTranslator.question}
                  </Text>
                </View>
                <View className="items-center justify-center">
                  <TouchableOpacity onPress={handleLogOut} className="bg-primary-500 w-44 h-11 justify-center items-center rounded-md">
                    <Text className="text-center text-white font-ZainBold"> {logOutTranslator.yes} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleOnPress} className="mt-4">
                    <Text className="text-primary-500 font-ZainBold"> {logOutTranslator.cancel} </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </>
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
