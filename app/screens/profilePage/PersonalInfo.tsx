import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import {
  pageButton,
  pageTitle,
  personalInfoPage,
} from "@/constants/profilePage";
import DateTimePicker from "react-native-ui-datepicker";
import Modal from "react-native-modal";
import dayjs, { Dayjs } from "dayjs";
import useAuthStore from "@/store/useAuthStore";
import { router } from "expo-router";
import { icons } from "@/constants";

import { useUserDetailsStore } from "@/store/UserDetailsStore";
import RadioButton from "@/components/Profile/RadioButton";
import InfoBoxWithTitle from "@/components/Profile/InfoBoxWithTitle";
import ParallaxScrollView from "@/components/ParallaxScrollView";

type DateType = string | Dayjs | null;
const PersonalInfo = () => {
  const { language, user, updateUserDetails } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);

  const { details, setDetails } = useUserDetailsStore();

  useEffect(() => {
    if (user?.details) {
      setDetails({
        address: user.details.address || "",
        birthday: user.details.birthday || "",
        gender: user.details.gender || "male",
        name: user.details.name || "",
      });
    }
  }, [user?.details]); // Add proper dependency

  const pageTitleTranslator = pageTitle[language];
  const personalInfoPageTranslator = personalInfoPage[language];
  const pageButtonTranslator = pageButton[language];

  const [open, setOpen] = useState(false);
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [date, setDate] = useState<DateType>(details.birthday);

  const handleChange = ({ date }: { date: any }) => {
    if (dayjs.isDayjs(date)) {
      const formattedDate = date.format("YYYY-MM-DD");
      setDate(formattedDate);
      setDetails({ ...details, birthday: formattedDate });
    }
  };
  const handleOnPress = () => {
    setOpen(!open);
  };

  const handleSaveModal = () => {
    setOpenSaveModal(!openSaveModal);
  };

  const handleOnSave = async () => {
    try {
      if (!details.name || !details.birthday) {
        Alert.alert(
          language === "ar" ? "خطأ" : "Error",
          language === "ar"
            ? "الرجاء ملء جميع الحقول المطلوبة"
            : "Please fill all required fields"
        );
        return;
      }
      setLoading(true);
      await updateUserDetails(details);
      router.push("/(tabs)/Profile");
    } catch (error) {
      Alert.alert(
        language === "ar" ? "خطأ" : "Error",
        language === "ar" ? "فشل حفظ التعديلات" : "Failed to save changes"
      );
    } finally {
      setOpenSaveModal(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    setDate(details.birthday);
  }, [details.birthday]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
    >
      <View className="flex-row justify-between items-center px-6 pt-6   ">
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
        <Text
          className={`  w-full  text-[#78828A] ${
            language === "ar"
              ? "font-ZainBold text-right"
              : "font-MontserratBold text-left"
          }   `}
        >
          {personalInfoPageTranslator.dateOfBirth}
        </Text>
        <View
          className="flex flex-row-reverse items-center justify-between  h-12 mt-3 rounded-xl bg-[#fff] w-11/12"
          style={{ borderWidth: 1, borderColor: "#E5E5E5" }}
        >
          <Text className="pr-4 font-ZainRegular text-[#9CA4AB]">
            {date
              ? dayjs(date).format(
                  language === "ar" ? "DD/MM/YYYY" : "MM/DD/YYYY"
                )
              : "-"}
          </Text>
          <View>
            <TouchableOpacity
              onPress={handleOnPress}
              accessibilityLabel={
                language === "ar" ? "حدد التاريخ" : "Select date"
              }
              accessibilityRole="button"
            >
              <Image
                source={personalInfoPageTranslator.icon}
                resizeMode="contain"
                className="ml-4 w-5 h-5"
              />
            </TouchableOpacity>
            <Modal animationIn="slideInUp" coverScreen isVisible={open}>
              <View className=" justify-center items-center mt-6 ">
                <View className=" bg-white rounded-2xl w-[90%] p-9 items-center justify-center shadow-lg shadow-slate-600">
                  <Text
                    className={`text-lg pb-2 ${
                      language === "ar"
                        ? "font-ZainBold "
                        : "font-MontserratBold "
                    }   `}
                  >
                    {personalInfoPageTranslator.dateOfBirth}
                  </Text>
                  <DateTimePicker
                    mode="single"
                    date={details.birthday}
                    onChange={handleChange}
                    selectedItemColor="#FF5733"
                  />
                  <TouchableOpacity onPress={handleOnPress}>
                    <Text
                      className={`text-primary-400 pb-2 ${
                        language === "ar"
                          ? "font-ZainBold "
                          : "font-MontserratBold "
                      }   `}
                    >
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

      <View className="w-full pt-4 justify-center items-center  ">
        <TouchableOpacity
          className="flex flex-row-reverse w-3/6 items-center justify-center border-b border-[#E9EBED] pb-5 pt-3"
          onPress={handleSaveModal}
        >
          <Text
            className={` text-primary-500 text-center ${
              language === "ar"
                ? "font-ZainBold  pr-4  "
                : "font-MontserratBold  pl-4  "
            }   `}
          >
            {pageButtonTranslator.saveChanges}
          </Text>
        </TouchableOpacity>
        <Modal animationIn="fadeIn" coverScreen isVisible={openSaveModal}>
          <View className="justify-center items-center mt-6 w-full h-full ">
            <View className="bg-white w-80 h-64 mx-auto rounded-2xl justify-center items-center ">
              <View className="p-16 pb-8">
                <Text
                  className={` text-center text-lg ${
                    language === "ar"
                      ? "font-ZainBold "
                      : "font-MontserratBold "
                  }   `}
                >
                  {pageButtonTranslator.agreementQuestion}
                </Text>
              </View>
              <View className="items-center justify-center">
                <TouchableOpacity
                  onPress={handleOnSave}
                  disabled={loading}
                  className="bg-primary-500 w-44 h-11 justify-center items-center rounded-md"
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text
                      className={` text-center text-white ${
                        language === "ar"
                          ? "font-ZainBold "
                          : "font-MontserratBold "
                      }   `}
                    >
                      {pageButtonTranslator.accept}
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSaveModal}
                  className="mt-4 flex justify-center items-center "
                >
                  <Text
                    className={` text-center text-primary-500 ${
                      language === "ar"
                        ? "font-ZainBold "
                        : "font-MontserratBold "
                    }   `}
                  >
                    {pageButtonTranslator.cancel}{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ParallaxScrollView>
  );
};

export default PersonalInfo;
