import React from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";

interface AdCardProps {
  title: string;
  uri: string;
}

const { width } = Dimensions.get("window");

const AdCard: React.FC<AdCardProps> = ({ title, uri }) => {
  const cardWidth = width * 0.7; // Dynamic card width
  const cardHeight = 150; // Fixed height as per your design

  return (
    <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
      <Image
        source={{
          uri: uri,
        }}
        style={styles.image}
        resizeMode="contain" // Ensures the entire image fits within the card
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#000", // Fallback color for empty spaces
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 16,
  },
  image: {
    width: "100%", // Full width of the container
    height: "100%", // Full height of the container
  },
});

export default AdCard;
