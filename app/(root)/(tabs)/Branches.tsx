import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { CarDataProps } from "@/types/AppwriteTypes";
import { createCarDocument } from "@/lib/appwrite/apit";

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
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Branches</Text>
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
