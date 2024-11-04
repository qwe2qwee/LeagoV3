import {
  AppwriteAccount,
  AppwriteDocument,
  AppwriteUser,
  CarDataProps,
  CarDocument,
  FileUpload,
  PhoneTokenResponse,
  SessionResponse,
  UploadedFileResponse,
  UserDocsForm,
  UserDocument,
  UserDocumentData,
} from "@/types/AppwriteTypes";
import { ID, Query } from "react-native-appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ParsedDetail, ParsedRentDetail } from "@/types/type";
// Import necessary types from appwriteTypes

// Error localization definition for English and Arabic
type ErrorMessages = {
  accountCreationFailed: string;
  phoneNumberExists: string;
  emailExists: string;
  phoneUpdateFailed: string;
  signInFailed: string;
  passwordResetFailed: string; // Additional error message
  otpSendFailed: string; // Additional error message
  documentUploadFailed: string; // Additional error message
  deleteUserFailed: string; // Additional error message
};

// Error localization function for English and Arabic
export function getLocalizedErrorMessage(
  errorKey: keyof ErrorMessages, // Ensure errorKey is a valid key
  language: "en" | "ar"
): string {
  const errorMessages: { [key in "en" | "ar"]: ErrorMessages } = {
    en: {
      accountCreationFailed: "Account creation failed",
      phoneNumberExists: "Phone number already exists",
      emailExists: "Email already exists",
      phoneUpdateFailed: "Failed to update phone number",
      signInFailed: "Sign-in failed",
      passwordResetFailed: "Password reset failed",
      otpSendFailed: "Failed to send OTP",
      documentUploadFailed: "Failed to upload documents",
      deleteUserFailed: "Failed to delete user",
    },
    ar: {
      accountCreationFailed: "فشل إنشاء الحساب",
      phoneNumberExists: "رقم الهاتف موجود بالفعل",
      emailExists: "البريد الإلكتروني موجود بالفعل",
      phoneUpdateFailed: "فشل في تحديث رقم الهاتف",
      signInFailed: "فشل تسجيل الدخول",
      passwordResetFailed: "فشل في إعادة تعيين كلمة المرور",
      otpSendFailed: "فشل إرسال رمز التحقق",
      documentUploadFailed: "فشل في تحميل المستندات",
      deleteUserFailed: "فشل في حذف المستخدم",
    },
  };

  return errorMessages[language]?.[errorKey] || errorMessages.en[errorKey];
}

// Define a transliteration map type
type TransliterationMap = { [key: string]: string };

// Expanded transliteration map from Arabic to English
const transliterationMap: TransliterationMap = {
  ا: "a",
  ب: "b",
  ت: "t",
  ث: "th",
  ج: "j",
  ح: "h",
  خ: "kh",
  د: "d",
  ذ: "dh",
  ر: "r",
  ز: "z",
  س: "s",
  ش: "sh",
  ص: "s",
  ض: "d",
  ط: "t",
  ظ: "z",
  ع: "a",
  غ: "gh",
  ف: "f",
  ق: "q",
  ك: "k",
  ل: "l",
  م: "m",
  ن: "n",
  ه: "h",
  و: "w",
  ي: "y",
  أ: "a",
  إ: "i",
  آ: "a",
  ؤ: "w",
  ئ: "y",
  ء: "",
  ى: "a",
  ة: "h",
  "ٓ": "",
  ٱ: "a",
  "ً": "",
  "ٌ": "",
  "ٍ": "",
  "َ": "a",
  "ُ": "u",
  "ِ": "i",
  "ّ": "",
  "ْ": "",
  "ٓ ": "",
  "؟": "?",
  "،": ",",
  "؛": ";",
  "٠": "0",
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
};

/** ======================================
 * USER LOGIC
 * ====================================== */

/**
 * Create a new user account and store it in the database
 *
 * @param email The user's email address
 * @param password The user's password
 * @param name The user's name
 * @param phone The user's phone number
 * @param languageError The language to use for error messages. Defaults to "en".
 * @returns The newly created user document
 */

// Create a new user function
export async function createUser(
  email: string,
  password: string,
  name: string,
  phone: string,
  birthday: string, // New field: birthday
  gender: "male" | "female" | "other", // New field: gender
  address: string, // New field: address
  languageError: "en" | "ar" = "en"
): Promise<AppwriteUser> {
  try {
    // Create an account with unique ID
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) {
      throw new Error(
        getLocalizedErrorMessage("accountCreationFailed", languageError)
      );
    }

    // Sign in the user
    await signIn(email, password, languageError);

    // Update phone number (you may need an actual function for this)
    await updatePhoneNumber(phone, password, languageError);

    // Define user details
    const userDetails = {
      name,
      birthday,
      gender,
      address,
    };

    // Convert userDetails to a JSON string and store it in the details array
    const jsonUserDetails = JSON.stringify(userDetails);

    // Create a new document for user details in Appwrite's database
    const newUser = await databases.createDocument<AppwriteUser>(
      appwriteConfig.databaseId as string,
      appwriteConfig.usersCollectionId as string,
      newAccount.$id,
      {
        email,
        userName: transliterateArabicToEnglish(name),
        phoneNumber: phone,
        details: [jsonUserDetails], // Store JSON string in details array
      }
    );

    return newUser as AppwriteUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// Function to sign in the user
export async function signIn(
  email: string,
  password: string,
  languageError: "en" | "ar" = "en"
): Promise<void> {
  try {
    await account.createEmailPasswordSession(email, password);
  } catch (error) {
    const errorMessage = getLocalizedErrorMessage(
      "signInFailed",
      languageError
    );
    console.error(errorMessage, error);
    throw new Error(errorMessage);
  }
}

// Example: Function to update the phone number (if applicable)
export async function updatePhoneNumber(
  phone: string,
  password: string,
  languageError: "en" | "ar" = "en"
): Promise<AppwriteAccount> {
  try {
    const updatedAccount = await account.updatePhone(phone, password);
    return updatedAccount;
  } catch (error) {
    const errorMessage = getLocalizedErrorMessage(
      "phoneUpdateFailed",
      languageError
    );
    console.error(errorMessage, error);
    throw new Error(errorMessage);
  }
}
/** ======================================
 * HELPER FUNCTIONS
 * ====================================== */

// Function to check if an email exists in the database
export async function isEmailExisting(email: string): Promise<boolean> {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId as string,
      appwriteConfig.usersCollectionId as string,
      [Query.equal("email", email)]
    );
    return response.documents.length > 0;
  } catch (error) {
    console.error("Failed to check email:", error);
    throw error;
  }
}

// Check if a phone number already exists in the database
export async function isPhoneNumberExisting(phone: string): Promise<boolean> {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId as string,
      appwriteConfig.usersCollectionId as string,
      [Query.equal("phoneNumber", phone)]
    );
    return response.documents.length > 0;
  } catch (error) {
    console.error("Failed to check phone number:", error);
    throw error;
  }
}

// Function to check if a username already exists in the database
export async function isUserNameExisting(userName: string): Promise<boolean> {
  try {
    const response = await databases.listDocuments<AppwriteUser>(
      appwriteConfig.databaseId as string,
      appwriteConfig.usersCollectionId as string,
      [Query.equal("userName", userName)]
    );
    return response.documents.length > 0;
  } catch (error) {
    console.error("Failed to check username:", error);
    throw error;
  }
}

// Function to transliterate Arabic name to English
export function transliterateArabicToEnglish(name: string): string {
  // Helper function to check if a character is Arabic
  const isArabic = (char: string): boolean => {
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
    return arabicRegex.test(char);
  };

  return name
    .split("")
    .map((char) => (isArabic(char) ? transliterationMap[char] || char : char)) // Only transliterate Arabic chars
    .join("")
    .replace(/\s+/g, ""); // Remove any spaces in the transliterated name
}

// Function to send OTP to email
export async function sendOtpToEmail(email: string): Promise<any> {
  try {
    const response = await account.createMagicURLToken(ID.unique(), email);
    return response;
  } catch (error) {
    console.error("Failed to send OTP to email:", error);
    throw error;
  }
}

// Function to get email by phone number
export const getEmailByPhoneNumber = async (
  phone: string
): Promise<string | null> => {
  try {
    const response = await databases.listDocuments<AppwriteUser>(
      appwriteConfig.databaseId as string,
      appwriteConfig.usersCollectionId as string,
      [Query.equal("phoneNumber", phone)]
    );

    if (response.documents.length > 0) {
      return response.documents[0].email;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching email by phone number:", error);
    throw error;
  }
};

// Function to generate a unique username based on an Arabic name without spaces
export async function generateUniqueUserName(
  arabicName: string
): Promise<string> {
  if (!arabicName) throw Error("arabicName cannot be null or undefined");

  const englishName = transliterateArabicToEnglish(arabicName.trim());
  let baseUserName = `@${englishName}`;
  let userName = baseUserName;
  let counter = 1;

  while (await isUserNameExisting(userName)) {
    if (counter > 1000) throw Error("Failed to generate a unique username");
    userName = `${baseUserName}${counter}`;
    counter++;
  }

  return userName;
}

// Function to reset the user's password
export async function resetPassword(
  newPassword: string
): Promise<AppwriteAccount> {
  try {
    const response = await account.updatePassword(newPassword);
    return response;
  } catch (error) {
    console.error("Failed to reset password:", error);
    throw new Error("Unable to reset password. Please try again later.");
  }
}

// Function to send OTP to the user's phone
export async function sendOtpToPhone(
  phone: string
): Promise<PhoneTokenResponse> {
  try {
    const response = await account.createPhoneToken(ID.unique(), phone);
    return response;
  } catch (error) {
    console.error("Failed to send OTP to phone:", error);
    throw new Error("Unable to send OTP to the phone number provided.");
  }
}

// Function to verify OTP and create a session for password reset
export async function verifyOtpAndResetPassword(
  userId: string,
  otp: string
): Promise<SessionResponse> {
  try {
    const session = await account.createSession(userId, otp);
    return session;
  } catch (error) {
    console.error("Failed to verify OTP and reset password:", error);
    throw new Error(
      "OTP verification failed. Please check the code and try again."
    );
  }
}

// Function to delete a user by userId
export async function deleteUser(userId: string): Promise<void> {
  try {
    await account.deleteIdentity(userId);
    console.log("User deleted successfully");
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw new Error("Unable to delete the user. Please check the user ID.");
  }
}

// Function to sign in a user with email and password

// Function to get the current user's account information
export async function getAccount(): Promise<AppwriteAccount> {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.error("Failed to get account:", error);
    throw new Error("Unable to fetch account information.");
  }
}

// Function to sign out the current user
export async function signOut(): Promise<void> {
  try {
    const session = await account.deleteSession("current");
  } catch (error) {
    console.error("Failed to sign out:", error);
    throw new Error("Sign-out failed. Please try again later.");
  }
}

// // Function to create user documents in the database
// export async function createUserDocs(
//   form: UserDocsForm,
//   userId: string
// ): Promise<UserDocument> {
//   try {
//     const [licenseUrl, identityUrl] = await Promise.all([
//       uploadFile(form.License, "image"),
//       uploadFile(form.Identity, "image"),
//     ]);

//     const docs = await databases.createDocument<Document>(
//       appwriteConfig.databaseId,
//       appwriteConfig.userdocs,
//       ID.unique(),
//       { identity: identityUrl, license: licenseUrl, creator: userId }
//     );

//     return docs;
//   } catch (error) {
//     console.error("Failed to create user documents:", error);
//     throw new Error(
//       "Unable to upload documents. Please check the file formats."
//     );
//   }
// }

/** ======================================
 * FILE STORAGE LOGIC
 * ====================================== */

// Function to upload a file to Appwrite's storage
// Function to upload a file
// Function to upload a file to Appwrite storage

// Define a type for the file object
interface FileAsset {
  uri: string;
  mimeType: string;
  name: string;
  type?: string; // Additional field to pass to the asset
}

export async function uploadFile(
  file: FileAsset | null,
  type: string
): Promise<string | undefined> {
  if (!file) return;

  const asset = { ...file, type: file.mimeType };

  try {
    // Upload file to Appwrite
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageIdDocs as string,
      ID.unique(),
      asset as any
    );

    return await getFilePreview(uploadedFile.$id, type);
  } catch (error) {
    console.error("Failed to upload file:", error);
    throw error;
  }
}

// Function to get a file preview URL from storage
export async function getFilePreview(
  fileId: string,
  type: string
): Promise<webkitURL> {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageIdDocs as string,
      fileId
    );
    return fileUrl;
  } catch (error) {
    console.error("Failed to get file preview:", error);
    throw error;
  }
}

// Example function for creating a user document in the database with specific data
export async function createUserDocs(
  form: UserDocsForm,
  userId: string
): Promise<UserDocument> {
  try {
    const [licenseUrl, identityUrl] = await Promise.all([
      uploadFile(form.License, "image"),
      uploadFile(form.Identity, "image"),
    ]);

    // Create document data object
    const documentData: UserDocumentData = {
      identity: identityUrl || undefined, // Use `||` to ensure proper handling
      license: licenseUrl || undefined,
      creatorId: userId,
    };

    // Save the document data in the database
    const docs = await databases.createDocument<UserDocument>(
      appwriteConfig.databaseId as string,
      appwriteConfig.userdocs as string,
      ID.unique(),
      documentData
    );

    return docs;
  } catch (error) {
    console.error("Failed to create user documents:", error);
    throw new Error(
      "Unable to upload documents. Please check the file formats."
    );
  }
}

// Function to fetch user's documents from Appwrite storage
export async function fetchUsersDocs(userId: string): Promise<any> {
  try {
    const response = await databases.getDocument(
      appwriteConfig.databaseId as string,
      appwriteConfig.userdocs as string,
      userId
    );
    return response.documents[0];
  } catch (error) {
    console.error("Failed to fetch user documents:", error);
    throw error;
  }
}

/// cars logic heree  ///////////////////////////////////////////////////////////////////////////////////////////////////

// Helper function to parse carLocation JSON string
export function parseCarLocation(
  carLocation: string | { lat: number; lon: number }
): { lat: number; lon: number } | null {
  // console.log("Received carLocation:", carLocation);

  // Check if `carLocation` is already an object with lat and lon properties
  if (typeof carLocation === "object" && carLocation !== null) {
    return carLocation as { lat: number; lon: number };
  }

  // If `carLocation` is a string, try parsing it as JSON
  if (typeof carLocation === "string") {
    try {
      return JSON.parse(carLocation);
    } catch (error) {
      console.error("Error parsing carLocation:", error);
      return null;
    }
  }

  console.error(
    "carLocation is neither an object nor a JSON string:",
    carLocation
  );
  return null;
}

// Helper function to parse details array with an image URL

export function parseDetails(details: any) {
  // console.log("Received details:", details);

  // If `details` is a string, try parsing it as JSON
  if (typeof details === "string") {
    try {
      details = JSON.parse(details);
    } catch (error) {
      console.error("Error parsing details as JSON:", error);
      return []; // Return an empty array if parsing fails
    }
  }

  if (!Array.isArray(details)) {
    console.error(
      "Expected details to be an array after parsing. Received:",
      details
    );
    return [];
  }

  try {
    return details.flatMap((detail) => {
      console.log("Processing detail:", detail);

      const { name, image, rentType, color, mileage, year } = detail;

      if (!rentType || typeof rentType !== "object") return []; // Skip if rentType is missing or not an object

      return detail; // Return the object as-is
    });
  } catch (error) {
    console.error("Error processing details:", error);
    return [];
  }
}

// Function to list car documents from the database
export async function listCars(
  queries: any[] = [] // Optional: queries to filter the results
) {
  try {
    // Call Appwrite's listDocuments API to retrieve car documents
    const response = await databases.listDocuments<CarDocument>(
      appwriteConfig.databaseId as string,
      appwriteConfig.carsCollectionId as string, // Collection ID for car documents
      queries
    );

    // console.log("Car documents retrieved successfully:", response.documents[0]);

    // Parse carLocation and details JSON strings into objects
    const cars = response.documents.map((car) => ({
      ...car,
      carLocation: parseCarLocation(car.carLocation), // Parse carLocation JSON string
      details: parseDetails(car.details), // Parse each item in details JSON array
    }));

    return cars as any;
  } catch (error) {
    console.error("Error listing cars:", error);
    throw new Error("Unable to retrieve the car list. Please try again.");
  }
}

export const createCarDocument = async (carData: CarDataProps) => {
  try {
    // Format the data for Appwrite, converting nested objects to JSON strings
    const formattedData = {
      carLocation: JSON.stringify(carData.carLocation),
      city: carData.city,
      ownerId: carData.ownerId,
      brand: carData.brand,
      details: JSON.stringify(carData.details),
      isHidden: carData.isHidden,
    };

    // Replace YOUR_DATABASE_ID and YOUR_COLLECTION_ID with the actual values
    const response = await databases.createDocument(
      appwriteConfig.databaseId as string,
      appwriteConfig.carsCollectionId as string,
      ID.unique(), // Generates a unique document ID
      formattedData
    );

    console.log("Document created successfully:", response);
    return response;
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};
