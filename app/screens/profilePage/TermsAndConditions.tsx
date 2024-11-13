import { View, Text, Pressable, Image, ScrollView } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { router } from "expo-router";
import useAuthStore from "@/store/useAuthStore";
import { termsAndConditions } from "@/constants/profilePage/termsAndConditions";
import { SafeAreaView } from "react-native-safe-area-context";

const TermsAndConditions = () => {
  const { language } = useAuthStore();
  const translator = termsAndConditions[language];

  return (
    <SafeAreaView>
      <View className="flex-row justify-between items-center p-6 ">
        <Pressable
          onPress={() => router.back()}
          className="bg-white rounded-full shadow-md"
        >
          <Image
            source={icons.backArrow}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </Pressable>
        <Text
          className={`${language === "ar" ? "font-ZainExtraBold" : "font-MontserratBold"} text-center text-[#272B3B] `}
        >
          {translator.title}
        </Text>
      </View>
      <ScrollView>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">{translator.mainTitle}</Text>
          <Text className="font-ZainRegular">{translator.discription}</Text>
        </View>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">
            {translator.difinitionsTitle}
          </Text>
          <Text className="font-ZainRegular">{translator.difinitions}</Text>
        </View>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">{translator.aboutUsTitle}</Text>
          <Text className="font-ZainRegular">{translator.aboutUs}</Text>
        </View>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">{translator.amendmentsTermsAndConditionsTitle}</Text>
          <Text className="font-ZainRegular">{translator.amendmentsTermsAndConditions}</Text>
        </View>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">{translator.registerAndClientResponsibilitiesTitle}</Text>
          <Text className="font-ZainRegular">{translator.registerAndClientResponsibilities}</Text>
        </View>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">{translator.digitalWalletTitle}</Text>
          <Text className="font-ZainRegular">{translator.digitalWallet}</Text>
        </View>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">{translator.userBehaviorRestrictionsTitle}</Text>
          <Text className="font-ZainRegular">{translator.userBehaviorRestrictions}</Text>
        </View>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">{translator.userContentTitle}</Text>
          <Text className="font-ZainRegular">{translator.userContent}</Text>
        </View>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">{translator.addtionalFeesAndRentalPaymentTitle}</Text>
          <Text className="font-ZainRegular">{translator.addtionalFeesAndRentalPayment}</Text>
        </View>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">{translator.cancellationOfConfirmedBookingAndEarlyReturnsTitle}</Text>
          <Text className="font-ZainRegular">{translator.cancellationOfConfirmedBookingAndEarlyReturns}</Text>
        </View>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">{translator.thirdPartyContentTitle}</Text>
          <Text className="font-ZainRegular">{translator.thirdPartyContent}</Text>
        </View>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">{translator.intellectualPropertyTitle}</Text>
          <Text className="font-ZainRegular">{translator.intellectualProperty}</Text>
        </View>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">{translator.emailsTitle}</Text>
          <Text className="font-ZainRegular">{translator.emails}</Text>
        </View>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">{translator.terminatingContractTitle}</Text>
          <Text className="font-ZainRegular">{translator.terminatingContract}</Text>
        </View>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">{translator.disclaimerOfWarrantiesTitle}</Text>
          <Text className="font-ZainRegular">{translator.disclaimerOfWarranties}</Text>
        </View>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">{translator.insemnificationAndCompensationTitle}</Text>
          <Text className="font-ZainRegular">{translator.insemnificationAndCompensation}</Text>
        </View>
        <View className="p-6">
          <Text className="pb-2 font-ZainBold">{translator.miscellaneousProvisionsTitle}</Text>
          <Text className="font-ZainRegular">{translator.miscellaneousProvisions}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditions;
