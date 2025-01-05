import {
  AppwriteAccount,
  AppwriteUser,
  CarDataProps,
  CarDocument,
  PhoneTokenResponse,
  Reservation,
  ReservationInfo,
  SessionResponse,
} from "@/types/AppwriteTypes";
import { ID, Models, Permission, Query, Role } from "react-native-appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { fetchCarDetails } from "@/constants";

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

// Save the hashed password
export async function savePassword(userId: string, password: string) {
  // Define permissions so only this user can read/write

  const response = await databases.createDocument(
    appwriteConfig.databaseId as string,
    appwriteConfig.usersPassword as string,
    ID.unique(),
    {
      userId,
      pass: password,
    }
  );

  console.log("Password saved:", response);
}

// get the pass
export async function getPassword(userId: string) {
  try {
    // Query the database for the document where userId matches
    const response = await databases.listDocuments(
      appwriteConfig.databaseId as string, // Your database ID
      appwriteConfig.usersPassword as string, // Your collection ID
      [Query.equal("userId", userId)] // Query to find the matching document
    );

    if (response.total > 0) {
      // Return the first matching document (assuming 1-to-1 user-password mapping)
      const passwordDocument = response.documents[0];
      console.log("Password retrieved:", passwordDocument);
      return passwordDocument.pass; // Return the hashed password
    } else {
      console.log("No password found for this user.");
      return null; // No password document exists for this user
    }
  } catch (error) {
    console.error("Error retrieving password:", error);
    throw error;
  }
}

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

    // Save the hashed password
    await savePassword(newAccount.$id, password);

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

// Function to reset the password
export async function ResetPasswordN(
  newPassword: string,
  oldPassword: string
): Promise<Models.User<Models.Preferences>> {
  try {
    const response = await account.updatePassword(newPassword, oldPassword);
    return response;
  } catch (error: any) {
    console.error("Error resetting password:", error);
    throw new Error(error.message);
  }
}

export async function completePasswordReset(
  userId?: any,
  secret?: any,
  newPassword?: string | null
): Promise<void> {
  if (!userId || !secret) {
    throw new Error("Missing required parameter for password reset.");
  }

  console.log("Starting password reset process...");
  console.log("Parameters:", { userId, secret, newPassword });

  try {
    // Attempt to complete the password reset
    console.log("Attempting to update recovery...");
    await account.updateMagicURLSession(userId, secret);
    console.log("Password reset successfully.");
  } catch (error: any) {
    console.error("Error completing password reset:", error.message);

    // Handle specific Appwrite errors
    if (error.message?.includes("Invalid secret")) {
      console.error("Invalid or expired secret key:", secret);
      throw new Error(
        "The secret key is invalid or has expired. Please request a new one."
      );
    }

    // Handle other unexpected errors
    if (error instanceof Error) {
      throw error;
    }

    // Default error handler
    throw new Error("Failed to reset password. Please try again.");
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
export async function sendOtpToEmail(
  email: string,
  lang: string = "en"
): Promise<Models.Token> {
  try {
    const response = await account.createEmailToken(ID.unique(), email);
    return response;
  } catch (error: any) {
    console.error("Error sending OTP to email:", error);
    throw new Error(error.message);
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

export async function getUserIdByPhoneOrEmail(
  identifier: string,
  lang: string = "en"
): Promise<string | null> {
  try {
    // Determine the type of identifier (email or phone)
    const isEmail = identifier.includes("@");
    const fieldName = isEmail ? "email" : "phone";

    // Query the database
    const response = (await databases.listDocuments(
      appwriteConfig.databaseId as string, // Replace with your database ID
      appwriteConfig.usersCollectionId as string, // Replace with your users collection ID
      [Query.equal(fieldName, identifier)]
    )) as any;

    if (response.documents.length > 0) {
      return response.documents[0].$id; // Return the user ID
    }

    throw new Error(isEmail ? "emailNotFound" : "phoneNotFound");
  } catch (error) {
    console.error(
      `Failed to fetch userId by ${
        identifier.includes("@") ? "email" : "phone"
      }:`,
      error
    );
    return null;
  }
}

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
export async function sendOtpToPhone(phone: string): Promise<string> {
  try {
    const response = await account.createPhoneToken(ID.unique(), phone);
    return response.userId;
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

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId as string,
      appwriteConfig.usersCollectionId as string,
      [Query.equal("account", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

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

// Function to sign out the current user
export async function signOut(): Promise<void> {
  try {
    const session = await account.deleteSession("current");
  } catch (error) {
    console.error("Failed to sign out:", error);
    throw new Error("Sign-out failed. Please try again later.");
  }
}

/** ======================================
 * USER LOGIC END
 * ====================================== */

/** ======================================
 * FILE STORAGE LOGIC
 * ====================================== */

// Upload File
export async function uploadFile(
  file: { name: string; mimeType: string; size: number; uri: string },
  type: string
): Promise<string | undefined> {
  if (!file) return;

  // Asset distribution based on the solution you found
  const asset = {
    name: file.name,
    type: file.mimeType,
    size: file.size,
    uri: file.uri,
  };

  try {
    // Convert URI to a File-like object
    // Upload file to Appwrite
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageIdDocs as string, // Replace with your Appwrite bucket ID
      ID.unique(), // Generate a unique file ID
      asset // Directly passing the file data
    );

    // Get file preview URL (assuming getFilePreview is a helper function)
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(`File upload error: ${error}`);
  }
}

// Function to get a preview URL for the uploaded file
export async function getFilePreview(
  fileId: string,
  type: string
): Promise<string> {
  try {
    let fileUrl: webkitURL;

    if (type === "video") {
      fileUrl = storage.getFileView(
        appwriteConfig.storageIdDocs as string,
        fileId
      );
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageIdDocs as string,
        fileId,
        2000,
        2000,
        "top" as any,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw new Error("Failed to generate file preview URL");

    return fileUrl as any;
  } catch (error) {
    console.error("Failed to get file preview:", error);
    throw new Error(
      `Failed to get file preview: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
/** ======================================
 * CAR LOGIC
 * ====================================== */

// Helper function to parse carLocation JSON string
export function parseCarLocation(
  carLocation: string | { lat: number; lon: number },
  lang: "en" | "ar" = "en"
): { lat: number; lon: number } | null {
  const errorMessages = {
    en: "Error parsing carLocation. Invalid format.",
    ar: "خطأ في تحليل موقع السيارة. تنسيق غير صالح.",
  };

  if (typeof carLocation === "object" && carLocation !== null) {
    return carLocation as { lat: number; lon: number };
  }

  if (typeof carLocation === "string") {
    try {
      return JSON.parse(carLocation);
    } catch (error) {
      console.error(errorMessages[lang], error);
      return null;
    }
  }

  console.error(errorMessages[lang]);
  return null;
}

// Helper function to parse details array with an image URL
export function parseDetails(details: any, lang: "en" | "ar" = "en") {
  const errorMessages = {
    en: "Error parsing details. Expected an array.",
    ar: "خطأ في تحليل التفاصيل. من المتوقع أن تكون التفاصيل في شكل مصفوفة.",
  };

  if (typeof details === "string") {
    try {
      details = JSON.parse(details);
    } catch (error) {
      console.error(errorMessages[lang], error);
      return [];
    }
  }

  if (!Array.isArray(details)) {
    console.error(errorMessages[lang]);
    return [];
  }

  return details.flatMap((detail) => {
    const { rentType } = detail;
    return rentType && typeof rentType === "object" ? detail : [];
  });
}

// Function to list car documents from the database
export async function listCars(
  queries?: any,
  lang: "en" | "ar" = "en",
  limit = 200,
  offset = 0
) {
  try {
    const response = await databases.listDocuments<CarDocument>(
      appwriteConfig.databaseId as string,
      appwriteConfig.carsCollectionId as string,
      [Query.offset(offset), Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return response.documents.map((car) => ({
      ...car,
      carLocation: parseCarLocation(car.carLocation, lang),
      details: parseDetails(car.details, lang),
    }));
  } catch (error) {
    console.error(
      lang === "en"
        ? "Unable to retrieve the car list. Please try again."
        : "تعذر استرجاع قائمة السيارات. حاول مرة أخرى.",
      error
    );
    throw new Error(
      lang === "en"
        ? "Unable to retrieve the car list. Please try again."
        : "تعذر استرجاع قائمة السيارات. حاول مرة أخرى."
    );
  }
}

// Modified search function with pagination
export async function searchCars(query: string, offset = 0, limit = 10) {
  try {
    const Cars = await databases.listDocuments<CarDocument>(
      appwriteConfig.databaseId as string,
      appwriteConfig.carsCollectionId as string,
      [
        Query.search("brand", query as any),
        Query.limit(limit),
        Query.offset(offset),
      ]
    );

    return Cars.documents.map((car) => ({
      ...car,
      carLocation: parseCarLocation(car.carLocation, "en"),
      details: parseDetails(car.details, "en"),
    }));
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
}

// Function to create a new car document
export const createCarDocument = async (
  carData: CarDataProps,
  lang: "en" | "ar" = "en"
) => {
  try {
    const formattedData = {
      carLocation: JSON.stringify(carData.carLocation),
      city: carData.city,
      ownerId: carData.ownerId,
      brand: carData.brand,
      details: JSON.stringify(carData.details),
      isHidden: carData.isHidden,
    };

    const response = await databases.createDocument(
      appwriteConfig.databaseId as string,
      appwriteConfig.carsCollectionId as string,
      ID.unique(),
      formattedData
    );

    console.log("Document created successfully:", response);
    return response;
  } catch (error) {
    console.error(
      lang === "en" ? "Error creating document." : "خطأ في إنشاء المستند.",
      error
    );
    throw error;
  }
};

// Function to like a car document
export async function likeCar(
  userId: string | null | undefined,
  carId: string | null | undefined,
  lang: "en" | "ar" = "en"
) {
  const errorMessages = {
    en: "Invalid input: userId and carId are required.",
    ar: "مدخلات غير صالحة: معرف المستخدم ومعرف السيارة مطلوبان.",
  };

  if (!userId || !carId) {
    console.error(errorMessages[lang]);
    return;
  }

  try {
    const existingLikes = await databases.listDocuments(
      appwriteConfig.databaseId as string,
      appwriteConfig.likesCollectionId as string,
      [Query.equal("userId", userId), Query.equal("carId", carId)]
    );

    if (existingLikes.total > 0) {
      await unlikeCar(userId, carId, lang);
      return;
    }

    const newLike = await databases.createDocument(
      appwriteConfig.databaseId as string,
      appwriteConfig.likesCollectionId as string,
      ID.unique(),
      {
        userId: userId,
        carId: carId,
        createdAt: new Date().toISOString(),
      }
    );

    console.log(
      lang === "en" ? "Car liked successfully" : "تم الإعجاب بالسيارة بنجاح",
      newLike
    );
  } catch (error) {
    console.error(
      lang === "en" ? "Error liking car." : "خطأ في الإعجاب بالسيارة.",
      error
    );
  }
}

// Function to check if a user has liked a car
export async function hasUserLikedCar(
  userId: string | null | undefined,
  carId: string | null | undefined,
  lang: "en" | "ar" = "en"
) {
  if (!userId || !carId) {
    console.error(
      lang === "en"
        ? "Invalid input: userId and carId are required."
        : "مدخلات غير صالحة: معرف المستخدم ومعرف السيارة مطلوبان."
    );
    return false;
  }

  try {
    const likes = await databases.listDocuments(
      appwriteConfig.databaseId as string,
      appwriteConfig.likesCollectionId as string,
      [Query.equal("userId", userId), Query.equal("carId", carId)]
    );

    return likes.total > 0;
  } catch (error) {
    console.error(
      lang === "en"
        ? "Error checking if user liked car."
        : "خطأ في التحقق من الإعجاب بالسيارة.",
      error
    );
    return false;
  }
}

// Function to get total likes for a car
export async function getCarLikesCount(
  carId: string | null | undefined,
  lang: "en" | "ar" = "en"
) {
  if (!carId) {
    console.error(
      lang === "en"
        ? "Invalid input: carId is required."
        : "مدخلات غير صالحة: معرف السيارة مطلوب."
    );
    return 0;
  }

  try {
    const likes = await databases.listDocuments(
      appwriteConfig.databaseId as string,
      appwriteConfig.likesCollectionId as string,
      [Query.equal("carId", carId)]
    );

    console.log(`Total likes for car ${carId}:`, likes.total);
    return likes.total;
  } catch (error) {
    console.error(
      lang === "en"
        ? "Error fetching car likes count."
        : "خطأ في جلب عدد الإعجابات للسيارة.",
      error
    );
    return 0;
  }
}

// Function to unlike a car
async function unlikeCar(
  userId: string | null | undefined,
  carId: string | null | undefined,
  lang: "en" | "ar" = "en"
) {
  if (!userId || !carId) {
    console.error(
      lang === "en"
        ? "Invalid input: userId and carId are required."
        : "مدخلات غير صالحة: معرف المستخدم ومعرف السيارة مطلوبان."
    );
    return;
  }

  try {
    const likes = await databases.listDocuments(
      appwriteConfig.databaseId as string,
      appwriteConfig.likesCollectionId as string,
      [Query.equal("userId", userId), Query.equal("carId", carId)]
    );

    if (likes.total === 0) {
      console.log(
        lang === "en"
          ? "No like found for this user on this car."
          : "لم يتم العثور على إعجاب لهذا المستخدم على هذه السيارة."
      );
      return;
    }

    const likeDocId = likes.documents[0].$id;
    await databases.deleteDocument(
      appwriteConfig.databaseId as string,
      appwriteConfig.likesCollectionId as string,
      likeDocId
    );

    console.log(
      lang === "en"
        ? "Car unliked successfully"
        : "تم إلغاء الإعجاب بالسيارة بنجاح"
    );
  } catch (error) {
    console.error(
      lang === "en" ? "Error unliking car." : "خطأ في إلغاء الإعجاب بالسيارة.",
      error
    );
  }
}
export async function Reservations(userId: string): Promise<ReservationInfo[]> {
  const reservations: ReservationInfo[] = [];

  try {
    // Fetch reservation documents from Appwrite
    const response = await databases.listDocuments(
      appwriteConfig.databaseId as string,
      appwriteConfig.reservationsCollectionId as string,
      [Query.equal("userId", userId)]
    );

    for (const reservation of response.documents) {
      try {
        const parsedDate =
          typeof reservation.date === "string"
            ? JSON.parse(reservation.date)
            : reservation.date;

        // Parse car details if `carId` exists
        const carInfo =
          reservation.carId && typeof reservation.carId.details === "string"
            ? JSON.parse(reservation.carId.details)[0] // Parse the first object in details array
            : null;

        // Parse the pay JSON field
        const parsedPay =
          typeof reservation.pay === "string"
            ? JSON.parse(reservation.pay)
            : reservation.pay;

        // Parse branchId location
        const branchLocation =
          typeof reservation.branchId?.location === "string"
            ? JSON.parse(reservation.branchId.location)
            : reservation.branchId?.location;

        function formatDate(isoDateString: string) {
          try {
            const date = new Date(isoDateString); // Parse the ISO date string
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Intl.DateTimeFormat("en-US", options).format(date); // Format the date
          } catch (error) {
            console.error("Invalid date format:", isoDateString, error);
            return "Unknown";
          }
        }
        console.log(parsedDate);

        const date = formatDate(reservation.reservationDate);
        reservations.push({
          id: reservation.$id,
          carName: carInfo?.name?.en || "Unknown",
          carYear: carInfo?.year || "Unknown",
          carColor: carInfo?.color || "Unknown",
          carImage: carInfo?.image || "Unknown",
          branchId: reservation.branchId?.$id || "Unknown",
          reservationDuration: parsedDate?.reservationDuration || "Unknown",
          carLocation: carInfo?.carLocation || "Unknown",
          city: reservation.carId?.city || "Unknown",
          reservationStart: parsedDate?.reservationStart || "Unknown",
          reservationEnd: parsedDate?.reservationEnd || "Unknown",
          reservationDate: date || "Unknown",
          bill: parsedPay?.price || "Unknown",
          payId: parsedPay?.payId || "Unknown",
          payStatus: parsedPay?.done ? "Completed" : "Pending",
          status: reservation.status || "Unknown",
        });
      } catch (error) {
        console.error("Failed to parse reservation:", reservation, error);
      }
    }
  } catch (error) {
    console.error("Error listing reservations:", error);
    throw new Error("Failed to fetch reservations");
  }

  return reservations;
}

// Function to create a rent document
export const createRent = async ({
  branchId,
  carId,
  userId,
  startDate,
  endDate,
  status,
  bill,
}: {
  branchId: string | null;
  carId: string | null;
  userId: string | null;
  startDate: string | null;
  endDate: string | null;
  status: string | null;
  bill: number | null;
}) => {
  if (
    !branchId ||
    !carId ||
    !userId ||
    !startDate ||
    !endDate ||
    !status ||
    bill === null
  ) {
    throw new Error("Missing required field for creating rent document.");
  }

  // console.log(branchId, "branchId");
  // console.log(carId, "carId");
  // console.log(userId, "userId");

  try {
    const response = await databases.createDocument(
      appwriteConfig.databaseId as string,
      appwriteConfig.rentals as string, // Replace with your collection ID
      ID.unique(),
      {
        branchId: branchId, // Wrap branchId in an array
        carId: [carId], // Wrap carId in an array
        userId: userId, // Wrap userId in an array
        startDate,
        endDate,
        status,
        bill,
      }
    );

    return response;
  } catch (error) {
    console.error("Failed to create rent document:", error);
    throw new Error("Unable to create rent document.");
  }
};
