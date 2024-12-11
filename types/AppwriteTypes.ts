// appwriteTypes.ts

import { Models } from "appwrite"; // Use Appwrite SDK types if available

// Base interface for an Appwrite document
export interface AppwriteDocument {
  $id: string;
  $collectionId: string;
  $createdAt: string;
  $updatedAt: string;
  $databaseId: string;
  $permissions: string[];
}

// Extending the base AppwriteDocument for specific user documents
export interface AppwriteUser extends AppwriteDocument {
  email: string;
  userName: string;
  phoneNumber: string;
  details: string;
}

export interface Reservation {
  reservationStart: string;
  reservationEnd: string;
  status: string;
}

export interface ReservationInfo extends AppwriteDocument {
  id: string;
  branchName: string;
  branchCity: string;
  carName: string;
  carYear: string;
  carColor: string;
  carImage: string;
  branchId: string;
  carLocation: any;
  city: string;
  branchLocation: string;
  reservationStart: string;
  reservationEnd: string;
  reservationDuration: string;
  reservationStatus: string;
  reservationDate: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  carDetails: {
    brand: string;
    model: string;
    carLocation: string;
    image: string;
  }[];
  bill: string;
  payId: string;
  payStatus: string;
}

export interface AppwriteUserParse extends AppwriteDocument {
  email: string;
  userName: string;
  phoneNumber: string;
  details: UserDetails;
}

// types/UserDetails.ts
export interface UserDetails {
  name: string;
  birthday: string;
  gender: "male" | "female" | "other";
  address: string;
  // Additional fields can be added here, such as:
  // phone: string;
  // email: string;
}

// Interface for the Appwrite Account object
export interface AppwriteAccount extends Models.User<Models.Preferences> {
  $id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  [key: string]: any;
}

// Response type for sending OTP to a phone number
export interface PhoneTokenResponse {
  userId: string;
}

// Session response type for email/password and OTP sessions
export interface SessionResponse {
  $id: string;
  userId: string;
  provider: string;
  [key: string]: any;
}

// Define types for user document creation
export interface UserDocsForm {
  License: FileUpload;
  Identity: FileUpload;
}

// Define the type for database document creation
export interface UserDocument extends AppwriteDocument {
  identity: File | undefined;
  license: File | undefined;
  creatorId: string;
}

// Data structure for storing user document data in the database
// Updated UserDocumentData to use string for URLs
export interface UserDocumentData {
  identity: string | undefined; // URL of the identity document
  license: string | undefined; // URL of the license document
  creatorId: string; // User ID of the creator
}

// Define structure for files to be uploaded
export interface FileUpload {
  mimeType: string;
  size: number;
  name: string;
  [key: string]: any;
}

// Response structure after uploading a file
export interface UploadedFileResponse {
  $id: string;
  [key: string]: any;
}

// Structure for file preview URLs
export interface FilePreview {
  fileId: string;
  url: string;
}

export type RentType = {
  daily: { price: number; availability: boolean };
  weekly: { price: number; availability: boolean };
  monthly: { price: number; availability: boolean };
  ownership: { price: number; availability: boolean };
};

export type CarDetails = {
  image: string;
  mileage: string;
  year: string;
  color: string;
  name: any;
  rentType: RentType;
};

export type CarDataProps = {
  carLocation: { lat: number; lon: number };
  city: string;
  ownerId: string;
  brand: string;
  details: CarDetails[];
  isHidden: boolean;
};

// Appwrite Account service interface for creating and managing users
export interface AccountService {
  create: (
    userId: string,
    email: string,
    password: string,
    name?: string
  ) => Promise<AppwriteAccount>;

  createEmailSession: (email: string, password: string) => Promise<void>;
  updatePhone: (phone: string, password: string) => Promise<AppwriteAccount>;
}

// Database service interface for CRUD operations
export interface DatabaseService {
  createDocument: (
    databaseId: string,
    collectionId: string,
    documentId: string,
    data: Record<string, any>
  ) => Promise<AppwriteDocument>;

  listDocuments: (
    databaseId: string,
    collectionId: string,
    queries: any[]
  ) => Promise<AppwriteListResponse<AppwriteDocument>>;
}

// Generic response structure from Appwrite's listDocuments API call
export interface AppwriteListResponse<T> {
  documents: T[];
  total: number;
}

// Define the response type for car documents
export interface CarDocument extends AppwriteDocument {
  carLocation: string; // Location of the car
  city: string; // City where the car is located
  ownerId: string; // ID of the car owner
  brand: string;
  details: any; // Array of JSON strings with additional car details (e.g., rentPrice, rentType, brand, the image URL)
  isHidden: boolean;
}
