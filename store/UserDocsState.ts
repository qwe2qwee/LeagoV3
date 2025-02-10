import { create } from "zustand";
import { DocumentState, DocumentType } from "@/types/type";
import { getDocumentByUserAndType, getFilePreview } from "@/lib/appwrite/apit";
import { appwriteConfig, storage } from "@/lib/appwrite/config";
import { Alert } from "react-native";

type UserDocsState = {
  documents: Record<DocumentType, DocumentState>;
  isLoading: boolean;
  setDocuments: (documents: Record<DocumentType, DocumentState>) => void;
  setIsLoading: (isLoading: boolean) => void;
  loadExistingDocuments: (userId: string) => Promise<void>;
};

export const useUserDocsStore = create<UserDocsState>((set) => ({
  documents: {
    identity: { uploading: false },
    license: { uploading: false },
  },
  isLoading: false,
  setDocuments: (documents) => set({ documents }),
  setIsLoading: (isLoading) => set({ isLoading }),
  loadExistingDocuments: async (userId) => {
    if (!userId) return;

    try {
      set({ isLoading: true });
      const userDocs = await getDocumentByUserAndType(userId);

      if (!userDocs) {
        set({
          documents: {
            identity: { uploading: false, error: undefined, url: undefined },
            license: { uploading: false, error: undefined, url: undefined },
          },
        });
        return;
      }

      const verifyFileExists = async (fileId: string) => {
        try {
          await storage.getFile(appwriteConfig.storageIdDocs, fileId);
          return true;
        } catch {
          return false;
        }
      };

      const [identityExists, licenseExists] = await Promise.all([
        typeof userDocs.identity === "string"
          ? verifyFileExists(userDocs.identity)
          : false,
        typeof userDocs.license === "string"
          ? verifyFileExists(userDocs.license)
          : false,
      ]);

      const [identityUrl, licenseUrl] = await Promise.all([
        identityExists ? getFilePreview(userDocs.identity, "identity") : null,
        licenseExists ? getFilePreview(userDocs.license, "license") : null,
      ]);

      set({
        documents: {
          identity: {
            uploading: false,
            url: identityUrl || undefined,
            error: identityExists ? undefined : "Document missing in storage",
          },
          license: {
            uploading: false,
            url: licenseUrl || undefined,
            error: licenseExists ? undefined : "Document missing in storage",
          },
        },
        isLoading: false,
      });
    } catch (error) {
      Alert.alert(
        "Load Failed",
        "Could not load documents. Check your connection and try again.",
        [
          {
            text: "Retry",
            onPress: () =>
              useUserDocsStore.getState().loadExistingDocuments(userId),
          },
        ]
      );
      set({ isLoading: false });
    }
  },
}));
