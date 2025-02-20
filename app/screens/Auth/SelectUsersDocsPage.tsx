import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import useAuthStore from "@/store/useAuthStore";
import { uploadUserDocument } from "@/lib/appwrite/apit";
import { appwriteConfig, databases, storage } from "@/lib/appwrite/config";
import { ID, Query } from "react-native-appwrite";
import { blurhash, icons, onboardingDocs } from "@/constants";
import { router } from "expo-router";
import TopBar from "@/components/Auth/TopBar";

interface AppwriteUserDoc {
  $id: string;
  userId: string;
  identityUrl?: string;
  licenseUrl?: string;
}

interface PickedFile {
  name: string;
  size: any;
  uri: string;
  type: any;
}

export default function SelectUsersDocsPage() {
  const { user, language } = useAuthStore();

  // State management
  const [identityUrl, setIdentityUrl] = useState<string | null>(null);
  const [licenseUrl, setLicenseUrl] = useState<string | null>(null);
  const [identityLocal, setIdentityLocal] = useState<PickedFile | null>(null);
  const [licenseLocal, setLicenseLocal] = useState<PickedFile | null>(null);
  const [uploading, setUploading] = useState(false);
  const [userDoc, setUserDoc] = useState<AppwriteUserDoc | null>(null); // Store full document data

  // Helper function to extract file ID from URL
  const extractFileId = (url: string) => {
    const urlParts = url.split("/files/");
    if (urlParts.length < 2) throw new Error("Invalid URL format");
    return urlParts[1].split("/")[0];
  };

  // Fetch user documents on component mount and user change
  useEffect(() => {
    const fetchUserDocuments = async () => {
      if (!user) return;
      try {
        const response = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.userdocs,
          [Query.equal("userId", user.$id)]
        );

        if (response.documents.length > 0) {
          const doc = response.documents[0] as any;
          setUserDoc(doc);
          setIdentityUrl(doc.identityUrl || null);
          setLicenseUrl(doc.licenseUrl || null);
        } else {
          setUserDoc(null);
          setIdentityUrl(null);
          setLicenseUrl(null);
        }
      } catch (error) {
        console.error("Error fetching user documents:", error);
        Alert.alert("Error", "Failed to load documents");
      }
    };

    fetchUserDocuments();
  }, [user]);

  // Handle document selection from device
  const handleSelectLocalDocument = async (type: "identity" | "license") => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: false,
      });

      if (!result.canceled && result.assets?.length) {
        const pickedFile: PickedFile = {
          name: result.assets[0].name,
          size: result.assets[0].size,
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
        };

        type === "identity"
          ? setIdentityLocal(pickedFile)
          : setLicenseLocal(pickedFile);
      }
    } catch (error) {
      console.error("Document selection error:", error);
      Alert.alert("Error", "Failed to select document");
    }
  };

  // Handle document deletion
  const handleDeleteDocument = async (type: "identity" | "license") => {
    // Type-specific validation
    if (
      !userDoc ||
      (type === "identity" && !identityUrl) ||
      (type === "license" && !licenseUrl)
    ) {
      Alert.alert("Error", "No document found to delete");
      return;
    }

    try {
      const currentUrl = type === "identity" ? identityUrl : licenseUrl;

      if (!currentUrl) {
        Alert.alert("Error", "No document found to delete");
        return;
      }

      // Extract file ID from storage URL
      const fileId = extractFileId(currentUrl);

      // Delete file from storage
      await storage.deleteFile(appwriteConfig.storageIdDocs, fileId);

      // Update database document
      const updateData = {
        [type === "identity" ? "identityUrl" : "licenseUrl"]: null,
      };

      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userdocs,
        userDoc.$id,
        updateData
      );

      // Update local state
      type === "identity" ? setIdentityUrl(null) : setLicenseUrl(null);
      Alert.alert("Success", "Document deleted successfully");

      // Refresh data from server
      router.replace("/(tabs)/Profile");
    } catch (error) {
      console.error("Delete error:", error);
      Alert.alert("Error", "Failed to delete document");
    }
  };

  // Handle document upload
  const handleUploadDocuments = async () => {
    if (!identityLocal && !licenseLocal) {
      Alert.alert("No changes", "Please select a document to upload.");
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = [];

      // Helper function to handle file replacement
      const replaceFile = async (
        type: "identity" | "license",
        localFile: PickedFile,
        currentUrl: string | null
      ) => {
        try {
          // Delete old file if exists
          if (currentUrl) {
            const oldFileId = extractFileId(currentUrl);
            await storage.deleteFile(appwriteConfig.storageIdDocs, oldFileId);
          }
        } catch (error) {
          console.error(`Error deleting old ${type} file:`, error);
        }

        // Upload new file
        const newUrl = await uploadUserDocument(localFile, type);
        return { type, url: newUrl };
      };

      if (identityLocal) {
        uploadPromises.push(
          replaceFile("identity", identityLocal, identityUrl)
        );
      }

      if (licenseLocal) {
        uploadPromises.push(replaceFile("license", licenseLocal, licenseUrl));
      }

      const results = await Promise.all(uploadPromises);

      // Update database document
      const updateData = results.reduce((acc, result) => {
        acc[result.type === "identity" ? "identityUrl" : "licenseUrl"] =
          result.url;
        return acc;
      }, {} as Record<string, string>);

      if (userDoc) {
        // Update existing document
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userdocs,
          userDoc.$id,
          updateData
        );
      } else if (user) {
        // Create new document
        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userdocs,
          ID.unique(),
          {
            userId: user.$id,
            ...updateData,
          }
        );
      }

      // Update local state
      results.forEach((result) => {
        result.type === "identity"
          ? setIdentityUrl(result.url)
          : setLicenseUrl(result.url);
      });

      setIdentityLocal(null);
      setLicenseLocal(null);
      Alert.alert("Success", "Documents uploaded successfully!");
      router.replace("/(tabs)/Profile");
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Failed to upload documents");
    } finally {
      setUploading(false);
    }
  };

  // Determine display source for preview
  const getDisplaySource = (
    local: PickedFile | null,
    remote: string | null
  ) => {
    if (local) return { uri: local.uri };
    if (remote) return { uri: remote };
    return icons.add;
  };

  return (
    <View className="flex-1 items-center p-4 bg-white">
      <TopBar title={onboardingDocs[0].selectUsersDocument[language]} />

      <View className="w-full space-y-8 gap-y-4">
        {/* Identity Document Section */}
        <View className="items-center">
          <Text className="text-lg font-bold">
            {onboardingDocs[0].title[language]}
          </Text>
          <TouchableOpacity
            onPress={() => handleSelectLocalDocument("identity")}
            disabled={uploading}
            className="w-64 h-64 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center"
          >
            <Image
              source={getDisplaySource(identityLocal, identityUrl)}
              className="flex-1 w-32 "
              resizeMode="contain"
              defaultSource={icons.camera}
            />
            {/* Delete Button */}
            {identityUrl && (
              <TouchableOpacity
                onPress={() => handleDeleteDocument("identity")}
                className="absolute top-2 right-2 bg-red-500 p-2 px-3 rounded-full"
              >
                <Text className="text-white">✕</Text>
              </TouchableOpacity>
            )}

            {/* Loading Indicator */}
            {uploading && (
              <ActivityIndicator
                className="absolute inset-0"
                color="#ffffff"
                size="large"
              />
            )}
          </TouchableOpacity>
        </View>

        {/* License Document Section */}
        <View className="items-center justify-center">
          <Text className="text-lg font-bold">
            {onboardingDocs[1].title[language]}
          </Text>
          <TouchableOpacity
            onPress={() => handleSelectLocalDocument("license")}
            disabled={uploading}
            className="w-64 h-64 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center"
          >
            <Image
              source={getDisplaySource(licenseLocal, licenseUrl)}
              className="flex-1 w-32 "
              resizeMode="contain"
              defaultSource={icons.add}
            />

            {/* Delete Button */}
            {licenseUrl && (
              <TouchableOpacity
                onPress={() => handleDeleteDocument("license")}
                className="absolute top-2 right-2 bg-red-500 p-2 px-3 rounded-full"
              >
                <Text className="text-white">✕</Text>
              </TouchableOpacity>
            )}

            {/* Loading Indicator */}
            {uploading && (
              <ActivityIndicator
                className="absolute inset-0"
                color="#ffffff"
                size="large"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Upload Button */}
      {(identityLocal || licenseLocal) && (
        <TouchableOpacity
          onPress={handleUploadDocuments}
          disabled={uploading}
          className={`mt-8 px-6 py-3 rounded-lg ${
            uploading ? "bg-gray-300" : "bg-primary-400"
          }`}
        >
          <Text className="text-white">
            {uploading ? "Uploading..." : "Upload Documents"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
