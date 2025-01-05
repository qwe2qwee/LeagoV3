import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  url: process.env.EXPO_PUBLIC_APPWRITE_URL,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM_COL,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID,
  storageIdDocs: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID_D,
  carsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CAR_COL,
  usersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COL,
  rentals: process.env.EXPO_PUBLIC_APPWRITE_RENTS,
  userdocs: process.env.EXPO_PUBLIC_APPWRITE_DOCS_USER,
  reservationsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_RESERVATION_COL,
  likesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_LIKES_COL,
  usersPassword: process.env.EXPO_PUBLIC_APPWRITE_USERS_PASS_COL,
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
