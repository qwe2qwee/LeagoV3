// the car object

const carData = {
  carLocation: { lat: 41.8781, lon: -87.6298 },
  city: "Chicago",
  ownerId: "987",
  brand: "Chevrolet",
  SearchName: "yaris", // in here the name that will fetch when the user search the car by the name of the car
  details: [
    {
      image: "https://example.com/images/chevrolet-impala.png",
      mileage: "15,000 miles",
      year: "2022",
      name: { ar: " شافرليه", en: "Chevrolet" },
      color: "White",
      rentType: {
        daily: { price: 0, availability: false },
        weekly: { price: 0, availability: false },
        monthly: { price: 0, availability: false },
        ownership: { price: 0, availability: false },
      },
    },
  ],
  isHidden: false,
};



// this one for the careted 


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