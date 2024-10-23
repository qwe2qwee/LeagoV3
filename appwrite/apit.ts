import {
  AppwriteAccount,
  AppwriteDocument,
  AppwriteUser,
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
function getLocalizedErrorMessage(
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
    if (await isEmailExisting(email)) {
      throw new Error(getLocalizedErrorMessage("emailExists", languageError));
    }
    if (await isPhoneNumberExisting(phone)) {
      throw new Error(
        getLocalizedErrorMessage("phoneNumberExists", languageError)
      );
    }

    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) {
      throw new Error(
        getLocalizedErrorMessage("accountCreationFailed", languageError)
      );
    }

    await signIn(email, password, languageError);
    await updatePhoneNumber(phone, password, languageError);

    const userDetails = {
      name, // New field: name
      birthday, // New field: birthday
      gender, // New field: gender
      address, // New field: address
    };

    const jsonD = JSON.stringify(userDetails);
    const newUser = await databases.createDocument<AppwriteUser>(
      appwriteConfig.databaseId as string,
      appwriteConfig.usersCollectionId as string,
      newAccount.$id,
      {
        email,
        userName: transliterateArabicToEnglish(name),
        phone_number: phone,
        deatails: [jsonD],
      }
    );

    return newUser as AppwriteUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// Sign in the user
async function signIn(
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

// Update the user's phone number
export async function updatePhoneNumber(
  phone: string,
  password: string,
  languageError: "en" | "ar" = "en"
): Promise<void> {
  try {
    await account.updatePhone(phone, password);
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
      [Query.equal("phone_number", phone)]
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
      [Query.equal("phone_number", phone)]
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
export async function uploadFile(
  file: FileUpload,
  type: string
): Promise<webkitURL | undefined> {
  if (!file) return;

  // Prepare the file asset with MIME type
  const asset = { type: file.mimeType, ...file };

  try {
    const uploadedFile: UploadedFileResponse = await storage.createFile(
      appwriteConfig.storageIdDocs as string,
      ID.unique(),
      asset as any
    );

    // Retrieve and return the file preview URL
    return await getFilePreview(uploadedFile.$id, type);
  } catch (error) {
    console.error("Failed to upload file:", error);
    throw new Error("Unable to upload file. Please try again.");
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
    throw new Error("Unable to retrieve file preview. Please try again.");
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
      identity: identityUrl as webkitURL | undefined,
      license: licenseUrl as webkitURL | undefined,
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
