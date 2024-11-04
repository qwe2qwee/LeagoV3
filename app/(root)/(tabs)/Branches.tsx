import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { CarDataProps } from "@/types/AppwriteTypes";
import { createCarDocument } from "@/lib/appwrite/apit";
import useAuthStore from "@/store/useAuthStore";

const carData: CarDataProps = {
  carLocation: { lat: 41.8781, lon: -87.6298 },
  city: "Chicago",
  ownerId: "987",
  brand: "Chevrolet",
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
const Branches = () => {
  const { user, getCurrentUser, createUser, logout, loading, error } =
    useAuthStore();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>{user?.details.birthday}</Text>
      <Text onPress={logout}>Branches</Text>

      {loading && <Text>Loading...</Text>}
      {/* <TouchableOpacity
        onPress={() => {
          createCarDocument(carData)
            .then((response) => {
              console.log("Document creation response:", response);
            })
            .catch((error) => {
              console.error("Document creation error:", error);
            });
        }}
      >
        <Text>Press me</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Branches;
