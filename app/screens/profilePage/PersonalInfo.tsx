import { Platform, SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { pageTitle, personalInfoPage } from "@/constants/profilePage";
import InfoBoxWithTitle from "@/components/profile/InfoBoxWithTitle";

type Language = "en" | "ar";


const PersonalInfo= () => {
  const [language, setLanguage] = useState<Language>("ar");
  const pageTitleTranslator = pageTitle[language]
  const personalInfoPageTranslator = personalInfoPage[language]

  return (
    <SafeAreaView style={styles.droidSafeArea} className="bg-white">
      <Text className={`${language === "ar" ? "font-ZainExtraBold" : "font-MontserratBold"} mt-3 text-center text-[#272B3B]`}>{pageTitleTranslator.personalInfo}</Text>
      <InfoBoxWithTitle 
        title={personalInfoPageTranslator.fullName}
        info={"أحمد حسين يونس"}
      />
      <InfoBoxWithTitle 
        title={personalInfoPageTranslator.dateOfBirth}
        info={"18/09/1411"}
        icon={personalInfoPageTranslator.icon}
      />
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
    paddingTop: Platform.OS === 'android' ?  StatusBar.currentHeight : 0
},
})

export default PersonalInfo;
