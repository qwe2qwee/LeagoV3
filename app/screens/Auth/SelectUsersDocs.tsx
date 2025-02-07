import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { router } from "expo-router";
import useAuthStore from "@/store/useAuthStore";
import { blurhash, getErrorMessage, icons, onboardingDocs } from "@/constants";
import { getDocumentByUserAndType, getFilePreview } from "@/lib/appwrite/apit";
import TopBar from "@/components/Auth/TopBar";
import SuccessModal from "@/components/Auth/SuccessModal";
import CustomButtonAuth from "@/components/Auth/CustomButtonAuth";
import { DocumentState, DocumentType } from "@/types/type";
import { ImageAt } from "@/components/ui/ImageAt";
import { appwriteConfig, databases, storage } from "@/lib/appwrite/config";
import { ID, Query } from "react-native-appwrite";

const SelectUsersDocs: React.FC = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [documents, setDocuments] = useState<
    Record<DocumentType, DocumentState>
  >({
    identity: { uploading: false },
    license: { uploading: false },
  });
  const { language, user } = useAuthStore();
  const isLastSlide = activeIndex === onboardingDocs.length - 1;

  useEffect(() => {
    if (isLastSlide && documents.identity.url && documents.license.url) {
      // setModalVisible(true);
    }
  }, [documents, isLastSlide]);

  useEffect(() => {
    const loadExistingDocuments = async () => {
      if (!user) return;

      try {
        const Docs = await getDocumentByUserAndType(user.$id);
        // Update preview URLs
        const [identityUrl, licenseUrl] = await Promise.all([
          getFilePreview(Docs?.identity, "identity"),
          getFilePreview(Docs?.license, "license"),
        ]);

        setDocuments((prev) => ({
          identity: {
            ...prev.identity,
            url: identityUrl || undefined,
          },
          license: {
            ...prev.license,
            url: licenseUrl || undefined,
          },
        }));
      } catch (error) {
        console.error("Error loading existing documents:", error);
      }
    };

    loadExistingDocuments();
  }, [user]);

  const handleDocumentPick = async (type: DocumentType) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (result.canceled) return;

      const asset = result.assets[0];
      setDocuments((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          file: {
            uri: asset.uri,
            type: asset.mimeType || "application/octet-stream",
            name: asset.name || "document",
            size: asset.size || 0,
          },
        },
      }));

      if (!isLastSlide) {
        swiperRef.current?.scrollBy(1);
      }
    } catch (error) {
      handleUploadError(type, "document_pick_failed", error);
    }
  };

  // Improved handleUpload function
  const handleUpload = async (currentUserId: string) => {
    if (!currentUserId) {
      Alert.alert("Authentication Error", "User not logged in");
      return;
    }

    if (!documents.identity.file || !documents.license.file) {
      Alert.alert(
        "Missing Documents",
        "Please select both documents before uploading."
      );
      return;
    }

    let newFileIds: { identity?: string; license?: string } = {};
    let oldFileIds: { identity?: string; license?: string } = {};
    let userDocId: string | null = null;

    try {
      // Fetch existing document
      const userDocs = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userdocs,
        [Query.equal("creatorId", currentUserId), Query.limit(1)]
      );

      if (userDocs.documents.length > 0) {
        const userDoc = userDocs.documents[0];
        userDocId = userDoc.$id;
        oldFileIds = { identity: userDoc.identity, license: userDoc.license };
      }

      // Set uploading state
      setDocuments((prev) => ({
        identity: { ...prev.identity, uploading: true, error: undefined },
        license: { ...prev.license, uploading: true, error: undefined },
      }));

      // Upload files with individual error tracking
      const uploadResults = await Promise.allSettled([
        storage.createFile(
          appwriteConfig.storageIdDocs,
          ID.unique(),
          documents.identity.file as any
        ),
        storage.createFile(
          appwriteConfig.storageIdDocs,
          ID.unique(),
          documents.license.file as any
        ),
      ]);

      // Handle partial upload failures
      const identityFile =
        uploadResults[0].status === "fulfilled" ? uploadResults[0].value : null;
      const licenseFile =
        uploadResults[1].status === "fulfilled" ? uploadResults[1].value : null;

      if (!identityFile || !licenseFile) {
        throw new Error(
          `Uploads failed: ${!identityFile ? "Identity " : ""}${
            !licenseFile ? "License" : ""
          }`
        );
      }

      newFileIds = {
        identity: identityFile.$id,
        license: licenseFile.$id,
      };

      // Update database
      const updateData = {
        identity: identityFile.$id,
        license: licenseFile.$id,
        canRent: false, // Wait for admin verification
      };

      if (userDocId) {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userdocs,
          userDocId,
          updateData
        );
      } else {
        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userdocs,
          ID.unique(),
          { ...updateData, creatorId: currentUserId }
        );
      }

      // Delete old files after successful update
      await Promise.allSettled([
        oldFileIds.identity &&
          storage.deleteFile(appwriteConfig.storageIdDocs, oldFileIds.identity),
        oldFileIds.license &&
          storage.deleteFile(appwriteConfig.storageIdDocs, oldFileIds.license),
      ]);

      // Update preview URLs
      const [identityUrl, licenseUrl] = await Promise.all([
        getFilePreview(identityFile.$id, "identity"),
        getFilePreview(licenseFile.$id, "license"),
      ]);

      setDocuments((prev) => ({
        identity: { ...prev.identity, url: identityUrl, uploading: false },
        license: { ...prev.license, url: licenseUrl, uploading: false },
      }));
      setModalVisible(true);
    } catch (error) {
      // Cleanup new files on error
      await Promise.allSettled([
        newFileIds.identity &&
          storage.deleteFile(appwriteConfig.storageIdDocs, newFileIds.identity),
        newFileIds.license &&
          storage.deleteFile(appwriteConfig.storageIdDocs, newFileIds.license),
      ]);

      // Granular error handling
      const errorMessage = getErrorMessage(error);
      const errors = {
        identity: errorMessage.includes("Identity") ? errorMessage : undefined,
        license: errorMessage.includes("License") ? errorMessage : undefined,
      };

      setDocuments((prev) => ({
        identity: {
          ...prev.identity,
          uploading: false,
          error: errors.identity || "Upload failed. Please try again.",
        },
        license: {
          ...prev.license,
          uploading: false,
          error: errors.license || "Upload failed. Please try again.",
        },
      }));

      Alert.alert("Upload Failed", "Failed to upload one or more documents");
    }
  };

  const handleUploadError = (
    type: DocumentType,
    key: string,
    error: unknown
  ) => {
    console.error(`${type} upload error:`, error);
    setDocuments((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        uploading: false,
        error: onboardingDocs[activeIndex].errors[key][language],
      },
    }));
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
                className={`w-4 h-4 rounded-full ${
                  activeIndex === index ? "bg-primary-400" : "bg-[#E0E7FF]"
                }`}
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
        {(["identity", "license"] as DocumentType[]).map((type) => (
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
                className={`text-black text-lg ${
                  language === "ar" ? "font-ZainRegular" : "font-MontserratBold"
                }`}
              >
                {onboardingDocs[activeIndex].title[language]}
              </Text>
              <Text
                className={`text-[#BFC6CC] text-sm ${
                  language === "ar"
                    ? "font-ZainRegular"
                    : "font-MontserratLight"
                }`}
              >
                {onboardingDocs[activeIndex].description[language]}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleDocumentPick(type)}
              style={{
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: "#FF5C39",
                borderRadius: 25,
              }}
              className="w-10/12 h-44 overflow-hidden flex items-center justify-center bg-[#E0E7FF]"
            >
              {documents[type].uploading ? (
                <View className="flex items-center justify-center">
                  <ActivityIndicator size="large" color="#FF5C39" />
                </View>
              ) : documents[type].url || documents[type].file ? (
                <ImageAt
                  style={styles.image}
                  source={documents[type].file?.uri || documents[type].url}
                  placeholder={{ blurhash }}
                  contentFit="cover"
                  cachePolicy="memory"
                  transition={1000}
                />
              ) : (
                <View className="flex items-center justify-center">
                  <Image source={icons.camera} className="w-12 h-12 mb-2" />
                  <Text
                    className={`text-primary-400 ${
                      language === "ar" ? "font-ZainExtraBold" : "font-ZainBold"
                    }`}
                  >
                    {onboardingDocs[activeIndex]?.title[language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            {documents[type].error && (
              <Text className="text-red-500 text-xs mt-2">
                {documents[type].error}
              </Text>
            )}
          </View>
        ))}
      </Swiper>

      <CustomButtonAuth
        loading={Object.values(documents).some((d) => d.uploading)}
        title={
          isLastSlide
            ? onboardingDocs[activeIndex]?.skip[language]
            : onboardingDocs[activeIndex]?.skip[language]
        }
        onPress={() => {
          if (!user?.$id) {
            Alert.alert("Authentication Error", "User not logged in");
            return;
          }
          isLastSlide ? handleUpload(user.$id) : swiperRef.current?.scrollBy(1);
        }}
      />
      <SuccessModal
        isVisible={isModalVisible}
        onClose={() => router.replace("/(tabs)/Profile")}
        title="Success!"
        subtitle="Your documents was successful send now we are checking."
      />
    </SafeAreaView>
  );
};

export default SelectUsersDocs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});
