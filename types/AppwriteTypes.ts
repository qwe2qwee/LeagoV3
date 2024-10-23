// Import relevant Appwrite types if you are using an Appwrite SDK that provides them
import { Models } from "react-native-appwrite"; // Import if you have Appwrite SDK installed

// Base interface for an Appwrite document
export interface AppwriteDocument {
  $id: string; // Unique document ID
  $collectionId: string; // Collection ID the document belongs to
  $createdAt: string; // Document creation timestamp
  $updatedAt: string; // Document last update timestamp
  $databaseId: string; // Database ID the document belongs to
  $permissions: string[]; // Ensure it's always an array
}

// Extending the base AppwriteDocument for specific user documents
export interface AppwriteUser extends AppwriteDocument {
  email: string; // User's email address
  name: string; // User's full name
  phone_number: string; // User's phone number
}

// Interface for the Appwrite Account object if you need to define more account-specific structures
export interface AppwriteAccount {
  $id: string; // Unique account ID
  email: string; // Account email
  name: string; // Account name
  phone_number?: string; // Optional phone number if associated with the account
}

// Generic response structure from Appwrite's `listDocuments` API call
export interface AppwriteListResponse<T> {
  documents: T[]; // Array of documents of type T
  total: number; // Total number of documents available
}

// Appwrite Account service object for creating users
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

// Database service object for CRUD operations
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

// You can extend other relevant types if needed for other Appwrite services like Storage or Functions.

// appwriteTypes.ts

// Extend AppwriteAccount for account operations
export interface AppwriteAccount {
  $id: string;
  email: string;
  name: string;
  phone_number?: string;
  [key: string]: any; // To allow additional dynamic properties
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
  [key: string]: any; // To handle any additional fields
}

// Type for user documents creation
export interface UserDocsForm {
  License: FileUpload;
  Identity: FileUpload;
}

// Type for database document creation
export interface UserDocument {
  $id: string; // Unique document ID
  $collectionId: string; // Collection ID the document belongs to
  $createdAt: string; // Document creation timestamp
  $updatedAt: string; // Document last update timestamp
  $databaseId: string; // Database ID the document belongs to
  $permissions: string[]; // Ensure it's always an array
  identity: webkitURL | undefined; // URL for the identity document
  license: webkitURL | undefined; // URL for the license document
  creatorId: string; // User ID of the creator
}

// Define the type for the document data when storing in the database
export interface UserDocumentData {
  identity: webkitURL | undefined; // URL for the identity document
  license: webkitURL | undefined; // URL for the license document
  creatorId: string; // User ID of the Id
}

// Define the structure of a file to be uploaded
export interface FileUpload {
  mimeType: string; // File's MIME type (e.g., "image/png")
  size: number; // File size in bytes
  name: string; // Original file name
  [key: string]: any; // Additional properties (like file content)
}

// Define the response structure after uploading a file
export interface UploadedFileResponse {
  $id: string; // Unique ID of the uploaded file
  [key: string]: any; // Additional fields that Appwrite's storage might return
}

// Define the structure for file preview URLs
export interface FilePreview {
  fileId: string; // The unique ID of the file in storage
  url: string; // The URL to preview the file
}
