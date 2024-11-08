// store/useAuthStore.ts
import { ID, Query } from "appwrite";
import { AppwriteUser, UserDetails } from "@/types/AppwriteTypes";
import {
  createUser as registerUser,
  getLocalizedErrorMessage,
  signIn,
  transliterateArabicToEnglish,
} from "@/lib/appwrite/apit";
import { account, appwriteConfig, databases } from "@/lib/appwrite/config";
import { create } from "zustand";

interface AuthState {
  user: (AppwriteUser & { details?: UserDetails }) | null;
  loading: boolean;
  error: string | null;
  language: "en" | "ar";
  latitude: number | null;
  longitude: number | null;

  // Methods
  createUser: (
    email: string,
    password: string,
    name: string,
    phone: string,
    birthday: string,
    gender: "male" | "female" | "other",
    address: string,
    languageError?: "en" | "ar"
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  getCurrentUser: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserDetails: (details: UserDetails) => Promise<void>; // New method
  updateLocation: (latitude: number, longitude: number) => void;
  toggleLanguage: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  language: "en",
  latitude: null,
  longitude: null,

  createUser: async (
    email: string,
    password: string,
    name: string,
    phone: string,
    birthday: string,
    gender: "male" | "female" | "other",
    address: string,
    languageError: "en" | "ar" = "en"
  ) => {
    set({ loading: true, error: null });
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (!newAccount) {
        throw new Error(
          getLocalizedErrorMessage("accountCreationFailed", languageError)
        );
      }

      await signIn(email, password, languageError);

      const userDetails: UserDetails = {
        name,
        birthday,
        gender,
        address,
      };

      const jsonUserDetails = JSON.stringify(userDetails);

      await databases.createDocument<AppwriteUser>(
        appwriteConfig.databaseId as string,
        appwriteConfig.usersCollectionId as string,
        newAccount.$id,
        {
          email,
          userName: transliterateArabicToEnglish(name),
          phoneNumber: phone,
          details: [jsonUserDetails],
        }
      );
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Error creating user:", errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      await signIn(email, password);
      const user = await account.get();
      set({ user } as any);
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Error logging in:", errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },

  getCurrentUser: async () => {
    set({ loading: true, error: null });
    try {
      const currentAccount = await account.get();
      if (!currentAccount) throw new Error("No current account found");

      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId as string,
        appwriteConfig.usersCollectionId as string,
        [Query.equal("$id", currentAccount.$id)]
      );

      const userDocument = currentUser.documents[0] as AppwriteUser;

      // Parse the `details` field
      let details: UserDetails | undefined;
      if (userDocument.details && userDocument.details.length > 0) {
        try {
          details = JSON.parse(userDocument.details[0]) as UserDetails;
        } catch (error) {
          console.error("Error parsing user details:", error);
        }
      }

      set({ user: { ...userDocument, details } } as any);
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Failed to get current user:", errorMessage);
      set({ error: errorMessage, user: null });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await account.deleteSession("current");
      set({ user: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Error during logout:", errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },

  // New method to update user details
  updateUserDetails: async (details: UserDetails) => {
    set({ loading: true, error: null });
    try {
      const { user } = useAuthStore.getState();
      if (!user) throw new Error("User not authenticated");

      const jsonUserDetails = JSON.stringify(details);

      // Update the document in Appwrite
      await databases.updateDocument(
        appwriteConfig.databaseId as string,
        appwriteConfig.usersCollectionId as string,
        user.$id,
        { details: [jsonUserDetails] }
      );

      // Update the state with the new details
      set({ user: { ...user, details } } as any);
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Error updating user details:", errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },

  updateLocation: (latitude: number, longitude: number) => {
    set({ latitude, longitude });
  },

  toggleLanguage: () => {
    set((state) => ({
      language: state.language === "en" ? "ar" : "en",
    }));
  },
}));

export default useAuthStore;
