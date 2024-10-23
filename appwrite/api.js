import { ID, Query } from "react-native-appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

/** ======================================
 * USER LOGIC
 * ====================================== */
// Interface for Appwrite User
declare interface AppwriteUser extends AppwriteDocument {
  email: string;
  name: string;
  phone_number: string;
}



// Helper function to get localized error message
function getLocalizedErrorMessage(errorKey: string, language: string): string {
  const errorMessages = {
    en: {
      accountCreationFailed: "Account creation failed",
      phoneNumberExists: "Phone number already exists",
      emailExists: "Email already exists",
      phoneUpdateFailed: "Failed to update phone number",
    },
    es: {
      accountCreationFailed: "La creación de la cuenta falló",
      phoneNumberExists: "El número de teléfono ya existe",
      emailExists: "El correo electrónico ya existe",
      phoneUpdateFailed: "Error al actualizar el número de teléfono",
    },
    // Add other languages as needed
  };
  
  return errorMessages[language]?.[errorKey] || errorMessages.en[errorKey];
}

// Create a new user account and store it in the database
export async function createUser(
  email: string,
  password: string,
  name: string,
  phone: string,
  languageError: string = 'en'
): Promise<AppwriteUser> {
  try {
    // Check if email or phone number already exists
    if (await isEmailExisting(email)) {
      throw new Error(getLocalizedErrorMessage('emailExists', languageError));
    }
    if (await isPhoneNumberExisting(phone)) {
      throw new Error(getLocalizedErrorMessage('phoneNumberExists', languageError));
    }

    // Create a new account
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) {
      throw new Error(getLocalizedErrorMessage('accountCreationFailed', languageError));
    }

    // Update the phone number
    await updatePhoneNumber(phone, password, languageError);

    // Sign in the user
    await signIn(email, password);

    // Create user in the database
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      newAccount.$id,
      { email, name, phone_number: phone }
    );

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// Check if a phone number already exists in the database
export async function isPhoneNumberExisting(phone: string): Promise<boolean> {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("phone_number", phone)]
    );
    return response.documents.length > 0;
  } catch (error) {
    console.error("Failed to check phone number:", error);
    throw error;
  }
}

// Function to check if an email exists in the database
export async function isEmailExisting(email: string): Promise<boolean> {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("email", email)]
    );
    return response.documents.length > 0;
  } catch (error) {
    console.error("Failed to check email:", error);
    throw error;
  }
}

// Update the user's phone number
export async function updatePhoneNumber(
  phone: string,
  password: string,
  languageError: string = 'en'
): Promise<any> {
  try {
    const result = await account.updatePhone(phone, password);
    return result;
  } catch (error) {
    const errorMessage = getLocalizedErrorMessage('phoneUpdateFailed', languageError);
    console.error(errorMessage, error);
    throw new Error(errorMessage);
  }
}

// Sign in the user
async function signIn(email: string, password: string): Promise<void> {
  try {
    await account.createEmailSession(email, password);
  } catch (error) {
    console.error("Sign-in failed:", error);
    throw error;
  }
}
// Function to check if a UeserName already exists in the database
export async function isUeserNameExisting(phone) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("userName", phone)]
    );
    return response.documents.length > 0; // Return true if a document with the phone number exists
  } catch (error) {
    console.error("Failed to check phone number:", error);
    throw error;
  }
}

// Function to transliterate Arabic name to English
function transliterateArabicToEnglish(name) {
  return name
    .split("")
    .map((char) => transliterationMap[char] || char) // Map Arabic chars to English equivalents
    .join("")
    .replace(/\s+/g, ""); // Remove any spaces in the transliterated name
}

// Function to send OTP to email
export async function sendOtpToEmail(email) {
  try {
    // Here, you would use Appwrite's built-in method or a custom implementation to send an OTP to the email.
    const response = await account.createMagicURLToken(ID.unique(), email);
    return response; // Return response if OTP sent successfully
  } catch (error) {
    console.error("Failed to send OTP to email:", error);
    throw error;
  }
}

// Function to getEmail to Sign In

export const getEmailByPhoneNumber = async (phone) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("phone", phone)]
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

// Function to send OTP to phone
export async function sendOtpToPhone(phone) {
  try {
    // Here, you would use Appwrite's built-in method or a custom implementation to send an OTP to the email.
    const response = await account.createPhoneToken(ID.unique(), phone);
    return response.userId; // Return response if OTP sent successfully
  } catch (error) {
    console.error("Failed to send OTP to email:", error);
    throw error;
  }
}

// Function to generate a unique username based on an Arabic name without spaces
export async function generateUniqueUserName(arabicName) {
  if (!arabicName) throw Error("arabicName cannot be null or undefined");
  const englishName = transliterateArabicToEnglish(arabicName.trim()); // Convert Arabic to English and remove spaces
  let baseUserName = `@${englishName}`; // Prepend @ to the transliterated name
  let userName = baseUserName;
  let counter = 1;

  // Check if the username exists, and if it does, append a number to create a unique one
  while (await isUeserNameExisting(userName)) {
    if (counter > 1000) throw Error("Failed to generate a unique username");
    userName = `${baseUserName}${counter}`; // Append counter to the base username
    counter++;
  }

  return userName; // Return the unique username
}

// Reset user's password
export async function resetPassword(newPassword) {
  try {
    const response = await account.updatePassword(newPassword);
    return response;
  } catch (error) {
    console.error("Failed to reset password:", error);
    throw error;
  }
}

// Send OTP to the user's phone
export async function sendOtpToPhone(phone) {
  try {
    const response = await account.createPhoneToken(ID.unique(), phone);
    return response.userId;
  } catch (error) {
    console.error("Failed to send OTP to phone:", error);
    throw error;
  }
}

// Verify OTP and create a session for password reset
export async function verifyOtpAndResetPassword(userId, otp) {
  try {
    const session = await account.createSession(userId, otp);
    return session;
  } catch (error) {
    console.error("Failed to verify OTP and reset password:", error);
    throw error;
  }
}

// Delete a user by userId
export async function deleteUser(userId) {
  try {
    await account.deleteIdentity(userId);
    console.log("User deleted successfully");
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
}

// Sign in a user with email and password
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Failed to sign in:", error);
    throw error;
  }
}

// Get the current user's account information
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.error("Failed to get account:", error);
    throw error;
  }
}

// Sign out the current user
export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.error("Failed to sign out:", error);
    throw error;
  }
}

// Create user documents in the database
export async function createUserDocs(form, userId) {
  try {
    const [licenseUrl, identityUrl] = await Promise.all([
      uploadFile(form.License, "image"),
      uploadFile(form.Identity, "image"),
    ]);

    const docs = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userdocs,
      ID.unique(),
      { identity: identityUrl, license: licenseUrl, creator: userId }
    );

    return docs;
  } catch (error) {
    console.error("Failed to create user documents:", error);
    throw error;
  }
}

// Get the current user's information
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw new Error("No current account found");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("$id", currentAccount.$id)]
    );

    return currentUser.documents[0];
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}

/** ======================================
 * FILE STORAGE LOGIC
 * ====================================== */

// Upload file to Appwrite storage
export async function uploadFile(file, type) {
  if (!file) return;
  const asset = { type: file.mimeType, ...file };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageIdDocs,
      ID.unique(),
      asset
    );
    return await getFilePreview(uploadedFile.$id, type);
  } catch (error) {
    console.error("Failed to upload file:", error);
    throw error;
  }
}

// Get file preview URL from storage
export async function getFilePreview(fileId, type) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageIdDocs,
      fileId
    );
    return fileUrl;
  } catch (error) {
    console.error("Failed to get file preview:", error);
    throw error;
  }
}

// Fetch user's documents from storage
export async function fetchUsersDocs(userId) {
  try {
    const response = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userdocs,
      userId
    );
    return response.documents[0];
  } catch (error) {
    console.error("Failed to fetch user documents:", error);
    throw error;
  }
}

/** ======================================
 * CAR LOGIC
 * ====================================== */

// Fetch all car documents from the database
export async function fetchCarDocuments() {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.carsCollectionId
    );
    return response.documents;
  } catch (error) {
    console.error("Failed to fetch car documents:", error);
    throw error;
  }
}

// Fetch the latest car rentals
export async function fetchLatestCarRent() {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.carsCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(4)]
    );
    return response.documents;
  } catch (error) {
    console.error("Failed to fetch latest car rentals:", error);
    throw error;
  }
}

// Search for cars by name
export async function searchCars(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.carsCollectionId,
      [Query.search("name", query)]
    );
    return posts.documents;
  } catch (error) {
    console.error("Failed to search cars:", error);
    throw error;
  }
}

// Book a car
export async function createCarBooking(
  carId,
  date,
  docs,
  userId,
  img,
  carName,
  d,
  ownerId,
  totalRent
) {
  try {
    const bookingId = ID.unique();
    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.rentals,
      bookingId,
      {
        id: bookingId,
        carId,
        userId,
        date: JSON.stringify(date),
        image: img,
        userDocuments: JSON.stringify(docs),
        details: [carName, d, totalRent],
        ownerId,
      }
    );
    return response;
  } catch (error) {
    console.error("Failed to create car booking:", error);
    throw error;
  }
}

// Like or unlike a car
export async function likeCar(carId, likesArray) {
  try {
    const updatedCar = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.carsCollectionId,
      carId,
      { likes: likesArray }
    );
    return updatedCar;
  } catch (error) {
    console.error("Failed to like or unlike car:", error);
    throw error;
  }
}

// Check if the user has liked a car
export const checkIsLiked = (likeList, userId) => {
  return likeList?.includes(userId);
};
