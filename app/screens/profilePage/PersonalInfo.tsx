import {
  Image,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { pageTitle, personalInfoPage } from "@/constants/profilePage";
import DateTimePicker from "react-native-ui-datepicker";
import InfoBoxWithTitle from "@/components/Profile/InfoBoxWithTitle";

type Language = "en" | "ar";

const PersonalInfo = () => {
  const [language, setLanguage] = useState<Language>("ar");
  const pageTitleTranslator = pageTitle[language];
  const personalInfoPageTranslator = personalInfoPage[language];

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("351654");

  const handleOnPress = () => {
    setOpen(!open);
  };

  return (
    <SafeAreaView style={styles.droidSafeArea} className="bg-white">
      <Text
        className={`${language === "ar" ? "font-ZainExtraBold" : "font-MontserratBold"} mt-3 text-center text-[#272B3B]`}
      >
        {pageTitleTranslator.personalInfo}
      </Text>
      <InfoBoxWithTitle
        title={personalInfoPageTranslator.fullName}
        info={"أحمد حسين يونس"}
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
            <Modal animationType="slide" transparent={true} visible={open}>
              <View className="flex justify-center items-center mt-6">
                <View className="m-5 bg-white rounded-2xl w-[90%] p-9   items-center justify-center shadow-lg shadow-slate-600">
                  <DateTimePicker
                    mode="single"
                    date={date}
                    onChange={({ date }: { date: Date }) => setDate(date)}
                  />
                  <TouchableOpacity onPress={handleOnPress}>
                    <Text>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
      <InfoBoxWithTitle
        title={personalInfoPageTranslator.mobileNo}
        info={"+966544463389"}
      />
      <InfoBoxWithTitle
        title={personalInfoPageTranslator.email}
        info={"ahmed.huyu@gmail.com"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default PersonalInfo;
