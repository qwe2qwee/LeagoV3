import { Linking, Text, Image, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import {
  contactUs,
  icons,
  termsAndConditions,
} from "@/constants/profilePage/termsAndConditions";
import useAuthStore from "@/store/useAuthStore";
import { router } from "expo-router";
import { companyAddress } from "@/constants/profilePage";
import { Pressable } from "react-native";
import { icons as backArrow } from "@/constants";
import LeagoTag from "@/components/Profile/LeagoTag";

type ContactType = "whatsapp" | "email";

const contact = (
  contactType: ContactType,
  phoneNumberOrEmail: string,
  subject?: string,
  body?: string
) => {
  let url: string;

  if (contactType === "whatsapp") {
    url = `whatsapp://send?phone=${phoneNumberOrEmail}`;
  } else {
    url = `mailto:${phoneNumberOrEmail}?subject=${encodeURIComponent(subject || "")}&body=${encodeURIComponent(body || "")}`;
  }

  Linking.openURL(url)
    .then(() => {
      console.log(
        `${contactType.charAt(0).toUpperCase() + contactType.slice(1)} client opened`
      );
    })
    .catch(() => {
      console.log(`Make sure ${contactType} is installed on your device`);
    });
};

const ContactUs = () => {
  const { language } = useAuthStore();
  const translator = contactUs[language];
  const companyAddressTranslator = companyAddress[language];

  const phoneNumber = "+966544463389"; // customer service number
  const email = "info@leago.org";
  const subject = "خدمة العملاء Customre Service";
  const body = "اكتب رسالتك هنا Write your Message here";

  return (
    <SafeAreaView className="bg-white items-center justify-start h-full w-full">
      <View className="flex-row justify-between items-center p-6 w-full">
        <Pressable
          onPress={() => router.back()}
          className="bg-white rounded-full shadow-md"
        >
          <Image
            source={backArrow.backArrow}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </Pressable>
        <Text
          className={`${language === "ar" ? "font-ZainExtraBold" : "font-MontserratBold"} text-center text-[#272B3B] `}
        >
          {translator.pageTitle}
        </Text>
      </View>
      <View className="border-[#FF7456] border-2 rounded-full p-10">
        <LeagoTag />
      </View>
      <View className="w-80 mx-10 mt-20">
        <TouchableOpacity
          className="flex flex-row-reverse w-full items-center justify-start border-b border-[#E9EBED] pb-5 pt-3"
          onPress={() => contact("whatsapp", phoneNumber)}
        >
          <Image
            source={icons.whatsapp}
            resizeMode="contain"
            className="w-7 h-7"
          />
          <Text className="pr-4 font-ZainBold">{translator.whatsappChat}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row-reverse w-full items-center justify-start border-b border-[#E9EBED] pb-5 pt-3 mt-4"
          onPress={() => contact("email", email, subject, body)}
        >
          <Image source={icons.mail} resizeMode="contain" className="w-7 h-7" />
          <Text className="pr-4 font-ZainBold">{translator.email}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-6 mx-auto mt-4"
          onPress={() => router.push("/screens/profilePage/TermsAndConditions")}
        >
          <Text
            className={`text-primary-400 ${language == "ar" ? "font-ZainRegular" : "font-MontserratMedium"}`}
          >
            {termsAndConditions[language].title}
          </Text>
        </TouchableOpacity>
        <View className=" w-80 border-b border-[#E9EBED] mt-10">
          <Text className="font-ZainBold">
            {companyAddressTranslator.companyName}
          </Text>
          <Text className="font-ZainRegular">
            {companyAddressTranslator.Address}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactUs;
