import { Platform, SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";
import React from "react";

const PersonalInfo= () => {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Text className="font-bold bg-slate-500"> Edit Profile</Text>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ?  StatusBar.currentHeight : 0
},
})

export default PersonalInfo;
