import { Image, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { pageTitle, personalInfoPage } from "@/constants/profilePage";
import DateTimePicker from "react-native-ui-datepicker";
import InfoBoxWithTitle from "@/components/Profile/InfoBoxWithTitle";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import dayjs from "dayjs";
import useAuthStore from "@/store/useAuthStore";
import RadioButton from "@/components/Profile/RadioButton";

type DateType = any; // Adjust according to the actual type if you know it, or use 'any' for flexibility
const PersonalInfo = () => {
  const { language, user } = useAuthStore();

  const pageTitleTranslator = pageTitle[language];
  const personalInfoPageTranslator = personalInfoPage[language];

  const [open, setOpen] = useState(false);
  // const [date, setDate] = useState("351654");
  const [date, setDate] = useState<DateType>(undefined);

  const handleChange = ({ date }: { date: DateType }) => {
    // Convert to JavaScript Date if it's a Day.js object
    if (date && typeof date.toDate === "function") {
      const dateConvert = date.toString();
      setDate(dayjs(dateConvert).format("YYYY-MM-DD")); // Convert Day.js to JavaScript String
    } else {
      setDate(date); // If it's already a Date object, use it as-is
    }

    console.log(date);
  };
  const handleOnPress = () => {
    setOpen(!open);
  };

  return (
    <SafeAreaView className="bg-white  h-full">
      <Text
        className={`${language === "ar" ? "font-ZainExtraBold" : "font-MontserratBold"} mt-3 text-center text-[#272B3B] `}
      >
        {pageTitleTranslator.personalInfo}
      </Text>
      <InfoBoxWithTitle
        title={personalInfoPageTranslator.fullName}
        info={user?.details?.name || "احمد يونس"}
      />
      <View className="justify-center items-end p-6 pb-0">
        <Text className="text-right font-ZainBold text-[#78828A]">
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
                    date={date}
                    onChange={handleChange}
                    selectedItemColor="#FF5733"
                  />
                  <TouchableOpacity onPress={handleOnPress}>
                    <Text className="font-ZainBold text-[#FF5C39]">موافق</Text>
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
      <RadioButton 
        title="الجنس"
      />
    </SafeAreaView>
  );
};

export default PersonalInfo;
