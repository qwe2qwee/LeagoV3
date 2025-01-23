import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig1 = {
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
  cardsCol: process.env.EXPO_PUBLIC_APPWRITE_CARDS_COL,
};

export const moyasarConfig = {
  // url: process.env.EXPO_PUBLIC_MOYASAR_URL,
  // key: process.env.EXPO_PUBLIC_MOYASAR_KEY,
  url: "https://api.moyasar.com/v1/payments",
  key: "pk_test_iCcpYKAVDAYtms1N33EX2KZ2C5ijdxdYorRtWhS5",
};

export const appwriteConfig = {
  url: "https://cloud.appwrite.io/v1",
  projectId: "6718972a001cbf7aeb1a",
  databaseId: "671898300022d0543f20",
  platform: "com.qwe2qwe.leagoV3",
  storageId: "6718985900257b1d4ee4",
  storageIdDocs: "672b83a4001181317fd4",
  carsCollectionId: "67189e99001221954884",
  usersCollectionId: "67189950000d0d9f1336",
  rentals: "6718a78e0021c8042df9",
  userdocs: "67189aae003ada3d5e76",
  reservationsCollectionId: "6720b19e0027df2261e5",
  likesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_LIKES_COL,
  usersPassword: process.env.EXPO_PUBLIC_APPWRITE_USERS_PASS_COL,
  cardsCol: process.env.EXPO_PUBLIC_APPWRITE_CARDS_COL,
};
export const client = new Client();

client
  .setEndpoint(appwriteConfig.url)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
