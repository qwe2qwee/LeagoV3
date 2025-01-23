import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import {
  logOutModal,
  profilePage,
  profileSections,
} from "@/constants/profilePage";
import useAuthStore from "@/store/useAuthStore";
import Modal from "react-native-modal";
import TouchableFeildWithIcon from "@/components/Profile/TouchableFeildWithIcon";
import ParallaxScrollView from "@/components/ParallaxScrollView";

const profile = () => {
  const { language, logout, user } = useAuthStore();
  const fieldTranslator = profilePage[language];
  const SecTranslator = profileSections[language];
  const logOutTranslator = logOutModal[language];
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOnPress = () => {
    setOpen(!open);
  };

  const handleLogOut = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
    >
      <View className="items-center justify-center h-full w-full bg-[#f3f4f6] ">
        {user && (
          <>
            <View className="itmes-center justify-center">
              <Text
                className="text-sm pr-10 py-2.5 font-ZainBold"
                style={{ textAlign: language === "ar" ? "right" : "left" }}
              >
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
                {/* <TouchableFeildWithIcon
                    icon={fieldTranslator.address.icon}
                    title={fieldTranslator.address.title}
                    pathName="/screens/profilePage/Address"
                  /> */}
              </View>
            </View>
          </>
        )}
        <View className="itmes-center justify-center mt-4">
          <Text
            className="text-sm pr-10 py-2.5 font-ZainBold"
            style={{ textAlign: language === "ar" ? "right" : "left" }}
          >
            {SecTranslator.general}
          </Text>
          <View className="w-80 mx-10">
            <TouchableFeildWithIcon
              icon={fieldTranslator.generalInfo.location.icon}
              title={fieldTranslator.generalInfo.location.title}
              pathName="/screens/profilePage/AddressSelectionPage"
            />
            {/* <TouchableFeildWithIcon
                icon={fieldTranslator.generalInfo.languages.icon}
                title={fieldTranslator.generalInfo.languages.title}
                pathName="/screens/profilePage/TermsAndConditions"
              /> */}
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
              className={`text-primary-400 ${
                language == "ar" ? "font-ZainRegular" : "font-MontserratMedium"
              }`}
            >
              {profileSections[language].buttonT}
            </Text>
          </TouchableOpacity>
          <Modal
            animationIn="slideInUp"
            coverScreen
            isVisible={open}
            className="flex justify-center items-center"
          >
            <View className="bg-white w-80 h-64 rounded-2xl justify-center items-center">
              <View className="p-16 pb-8">
                <Text className="text-center text-lg font-ZainBold">
                  {logOutTranslator.question}
                </Text>
              </View>
              <View className="items-center justify-center">
                <TouchableOpacity
                  onPress={handleLogOut}
                  className="bg-primary-500 w-44 h-11 justify-center items-center rounded-md"
                >
                  <Text className="text-center text-white font-ZainBold">
                    {" "}
                    {logOutTranslator.yes}{" "}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOnPress} className="mt-4">
                  <Text className="text-primary-500 font-ZainBold">
                    {" "}
                    {logOutTranslator.cancel}{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
      {!user && (
        <View className="items-center justify-center">
          <TouchableOpacity
            onPress={() => router.replace("/(auth)/sign-in")}
            className="bg-primary-500 w-44 h-11 justify-center items-center rounded-md"
          >
            <Text className="text-white text-base font-ZainBold">
              تسجيل الدخول
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ParallaxScrollView>
  );
};

export default profile;
