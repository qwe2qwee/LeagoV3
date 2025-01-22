import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import {
  pageButton,
  pageTitle,
  personalInfoPage,
  profilePage,
  profileSections,
} from "@/constants/profilePage";
import DateTimePicker from "react-native-ui-datepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import dayjs from "dayjs";
import useAuthStore from "@/store/useAuthStore";
import { router } from "expo-router";
import { icons } from "@/constants";

import { useUserDetailsStore } from "@/store/UserDetailsStore";
import RadioButton from "@/components/Profile/RadioButton";
import InfoBoxWithTitle from "@/components/Profile/InfoBoxWithTitle";
import ParallaxScrollView from "@/components/ParallaxScrollView";

type DateType = any; // Adjust according to the actual type if you know it, or use 'any' for flexibility

const PersonalInfo = () => {
  const { language, user, updateUserDetails } = useAuthStore();
  const { details, setDetails } = useUserDetailsStore();

  useEffect(() => {
    setDetails({
      address: user?.details?.address,
      birthday: user?.details?.birthday,
      gender: user?.details?.gender,
      name: user?.details?.name,
    });
  }, []);

  const pageTitleTranslator = pageTitle[language];
  const personalInfoPageTranslator = personalInfoPage[language];
  const fieldTranslator = profilePage[language];
  const SecTranslator = profileSections[language];
  const pageButtonTranslator = pageButton[language];

  const [open, setOpen] = useState(false);
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [date, setDate] = useState<DateType>(details.birthday);

  const handleChange = ({ date }: { date: DateType }) => {
    // Convert to JavaScript Date if it's a Day.js object
    if (date && typeof date.toDate === "function") {
      const dateConvert = date.toString();
      setDate(dayjs(dateConvert).format("YYYY-MM-DD")); // Convert Day.js to JavaScript String
      setDetails({ birthday: dayjs(dateConvert).format("YYYY-MM-DD") });
    } else {
      setDate(date); // If it's already a Date object, use it as-is
    }
  };
  const handleOnPress = () => {
    setOpen(!open);
  };

  const handleSaveModal = () => {
    setOpenSaveModal(!openSaveModal);
  };

  const handleOnSave = () => {
    updateUserDetails(details);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
    >
      <View className="flex-row justify-between items-center px-6 pt-6  ">
        <Pressable
          onPress={() => router.back()}
          className="bg-white rounded-full shadow-md p-2"
        >
          <Image
            source={icons.backArrow}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </Pressable>
        <Text
          className={`${
            language === "ar" ? "font-ZainExtraBold" : "font-MontserratBold"
          } text-center text-[#272B3B] `}
        >
          {pageTitleTranslator.personalInfo}
        </Text>
      </View>
      <InfoBoxWithTitle
        title={personalInfoPageTranslator.fullName}
        info={user?.details?.name || "الاسم"}
      />
      <View className="justify-center items-center p-6 pb-0 b">
        <Text className="text-right  w-full font-ZainBold text-[#78828A]">
          {personalInfoPageTranslator.dateOfBirth}
        </Text>
        <View className="flex flex-row-reverse items-center justify-between w-80 h-12 mt-3 rounded-xl bg-[#F7F7F7]">
          <Text className="pr-4 font-ZainRegular text-[#9CA4AB]">{date}</Text>
          <View>
            <TouchableOpacity onPress={handleOnPress}>
              <Image
                source={personalInfoPageTranslator.icon}
                resizeMode="contain"
                className="ml-4 w-5 h-5"
              />
            </TouchableOpacity>
            <Modal animationIn="slideInUp" coverScreen isVisible={open}>
              <View className="flex justify-center items-center mt-6">
                <View className="m-5 bg-white rounded-2xl w-[90%] p-9 items-center justify-center shadow-lg shadow-slate-600">
                  <Text className="text-lg font-ZainBold pb-2">
                    {personalInfoPageTranslator.dateOfBirth}
                  </Text>
                  <DateTimePicker
                    mode="single"
                    date={details.birthday}
                    onChange={handleChange}
                    selectedItemColor="#FF5733"
                  />
                  <TouchableOpacity onPress={handleOnPress}>
                    <Text className="font-ZainBold text-primary-400">
                      {pageButtonTranslator.accept}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
      <InfoBoxWithTitle
        title={personalInfoPageTranslator.mobileNo}
        info={user?.phoneNumber}
      />
      <InfoBoxWithTitle
        title={personalInfoPageTranslator.email}
        info={user?.email}
      />
      <RadioButton />

      <View className="w-80 mx-10 pt-4 justify-center items-center ">
        <TouchableOpacity
          className="flex flex-row-reverse w-full items-center justify-center border-b border-[#E9EBED] pb-5 pt-3"
          onPress={handleSaveModal}
        >
          <Text className="pr-4 font-ZainBold text-primary-500 text-center">
            {pageButtonTranslator.saveChanges}
          </Text>
        </TouchableOpacity>
        <Modal animationIn="slideInUp" coverScreen isVisible={openSaveModal}>
          <View className="bg-white w-80 h-64 rounded-2xl">
            <View className="p-16 pb-8">
              <Text className="text-center text-lg font-ZainBold">
                {pageButtonTranslator.agreementQuestion}
              </Text>
            </View>
            <View className="items-center justify-center">
              <TouchableOpacity
                onPress={handleOnSave}
                className="bg-primary-500 w-44 h-11 justify-center items-center rounded-md"
              >
                <Text className="text-center text-white font-ZainBold">
                  {" "}
                  {pageButtonTranslator.accept}{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveModal} className="mt-4">
                <Text className="text-primary-500 font-ZainBold">
                  {pageButtonTranslator.cancel}{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ParallaxScrollView>
  );
};

export default PersonalInfo;
