import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { router } from "expo-router";
import useAuthStore from "@/store/useAuthStore";
import { icons, onboardingDocs } from "@/constants";
import { uploadFile } from "@/lib/appwrite/apit";
import TopBar from "@/components/Auth/TopBar";
import CustomButton from "@/components/ui/CustomButton";
import SuccessModal from "@/components/Auth/SuccessModal";

type Language = "en" | "ar";

interface FileAsset {
  uri: string;
  mimeType: string;
  name: string;
  size: any;
}

interface Images {
  identity: FileAsset | undefined;
  license: FileAsset | undefined;
}

interface UploadedImages {
  identity: string | undefined;
  license: string | undefined;
}

const SelectUsersDocs: React.FC = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [images, setImages] = useState<Images>({
    identity: undefined,
    license: undefined,
  });
  const [uploadedImages, setUploadedImages] = useState<UploadedImages>({
    identity: undefined,
    license: undefined,
  });
  const [uploading, setUploading] = useState<boolean>(false);
  const { user, language } = useAuthStore();
  const isLastSlide = activeIndex === onboardingDocs.length - 1;

  console.log(user?.details?.name);

  const toggleModal = () => {
    router.replace("/(root)/(tabs)/Profile");
    setModalVisible(!isModalVisible);
  };

  const pickImage = async (type: keyof Images) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (!result.canceled) {
        const {
          uri,
          mimeType = "image/jpeg",
          name = "uploaded_image.jpg",
          size,
        } = result.assets[0];
        setImages((prev) => ({
          ...prev,
          [type]: { uri, mimeType, name, size },
        }));
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while selecting the document.");
      console.error("Document selection error:", error);
    }
  };

  const uploadAllImages = async () => {
    if (!images.identity || !images.license) {
      Alert.alert(
        "Missing Documents",
        "Please select both images before uploading."
      );
      return;
    }

    setUploading(true);
    try {
      const newUploadedImages: UploadedImages = {
        identity: undefined,
        license: undefined,
      };

      await Promise.all(
        Object.entries(images).map(async ([type, fileAsset]) => {
          if (fileAsset) {
            const fileUrl = await uploadFile(fileAsset, "image");
            newUploadedImages[type as keyof UploadedImages] = fileUrl;
            console.log(`${type} image uploaded successfully:`, fileUrl);
          }
        })
      );

      setUploadedImages(newUploadedImages);
      setModalVisible(true);
    } catch (error) {
      console.error("Image upload failed:", error);
      Alert.alert(
        "Upload failed",
        "An error occurred while uploading the documents."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-start flex-1 bg-white relative">
      <TopBar
        title={onboardingDocs[activeIndex].selectUsersDocument[language]}
      />
      <View className="flex flex-row justify-center items-center mt-4">
        {onboardingDocs.map((_, index) => (
          <React.Fragment key={index}>
            <View className="p-1 rounded-full bg-[#E0E7FF]">
              <View
                className={`w-4 h-4 rounded-full ${activeIndex === index ? "bg-primary-400" : "bg-[#E0E7FF]"}`}
              />
            </View>
            {index < onboardingDocs.length - 1 && (
              <View className="w-20 h-[2px] bg-[#E0E7FF]" />
            )}
          </React.Fragment>
        ))}
      </View>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={null}
        activeDot={null}
        paginationStyle={{ display: "none" }}
        onIndexChanged={setActiveIndex}
      >
        {(["identity", "license"] as Array<keyof Images>).map((type) => (
          <View
            key={type}
            className="flex items-center justify-center px-1 mt-8"
          >
            <View className="w-10/12 px-3 py-4 border-[1px] border-[#E6E6E6] my-6">
              <View className="flex items-start justify-center">
                <Image
                  source={icons.docsImage}
                  className="w-8 h-8 mb-2"
                  resizeMode="contain"
                />
              </View>
              <Text
                className={`text-black text-lg ${language === "ar" ? "font-ZainRegular" : "font-MontserratBold"}`}
              >
                {onboardingDocs[activeIndex].title[language]}
              </Text>
              <Text
                className={`text-[#BFC6CC] text-sm ${language === "ar" ? "font-ZainRegular" : "font-MontserratLight"}`}
              >
                {onboardingDocs[activeIndex].description[language]}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => pickImage(type)}
              style={{
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: "#FF5C39",
                borderRadius: 25,
              }}
              className="w-10/12 h-44 overflow-hidden flex items-center justify-center bg-[#E0E7FF]"
            >
              {uploadedImages[type] ? (
                <Image
                  source={{ uri: uploadedImages[type] }}
                  className="w-full h-full rounded-lg"
                  resizeMode="contain"
                />
              ) : images[type] ? (
                <Image
                  source={{ uri: images[type]?.uri }}
                  className="w-full h-full rounded-lg"
                  resizeMode="contain"
                />
              ) : (
                <View className="flex items-center justify-center">
                  <Image source={icons.camera} className="w-12 h-12 mb-2" />
                  <Text
                    className={`text-primary-400 ${language === "ar" ? "font-ZainExtraBold" : "font-ZainBold"}`}
                  >
                    {onboardingDocs[activeIndex]?.title[language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </Swiper>

      <CustomButton
        loading={uploading}
        title={onboardingDocs[activeIndex]?.skip[language]}
        onPress={() =>
          isLastSlide ? uploadAllImages() : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mt-4 mb-8 rounded-xl"
      />
      <SuccessModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        title="Success!"
        subtitle="Your docments was successful send now we are checking."
      />
    </SafeAreaView>
  );
};

export default SelectUsersDocs;
