import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { blurhash } from "@/constants";
import { useUserDocsStore } from "@/store/UserDocsState";

const ImageAtt = ({ isUriL }: { isUriL: any }) => {
  return (
    <Image
      style={[{ width: "40%", height: "40%", borderRadius: 24 }]}
      source={isUriL}
      placeholder={blurhash}
      contentFit="contain"
      transition={300}
      accessibilityIgnoresInvertColors
    />
  );
};

export default ImageAtt;
