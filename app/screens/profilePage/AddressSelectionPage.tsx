import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import useAuthStore from "@/store/useAuthStore";
import { router, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

interface Neighborhood {
  name: {
    en: string; // English name
    ar: string; // Arabic name
  };
  latitude: number;
  longitude: number;
}

interface City {
  name: string;
  neighborhoods: Neighborhood[];
}

const cities: City[] = [
  {
    name: "Jeddah",
    neighborhoods: [
      {
        name: { en: "Al Safa", ar: "الصّفا" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Salamah", ar: "السلامة" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Rawdah", ar: "الروضة" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Faisaliyah", ar: "الفيصلية" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Hamra", ar: "الحمراء" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Aziziyah", ar: "العزيزية" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Rehab", ar: "الرحاب" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Khalidiyah", ar: "الخالدية" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Bawadi", ar: "البوادي" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Zahra", ar: "الزهراء" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Shati", ar: "الشاطئ" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Naseem", ar: "النسيم" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Andalous", ar: "الأندلس" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Balad", ar: "البلد" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Mohamadiyah", ar: "المحمدية" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Marwah", ar: "المروة" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Naeem", ar: "النعيم" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Sharafiyah", ar: "الشرفية" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Al Thagher", ar: "الثغر" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
      {
        name: { en: "Prince Fawaz", ar: "الأمير فواز" },
        latitude: 21.584873,
        longitude: 39.205959,
      },
    ],
  },
];

const AddressSelectionPage = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<Neighborhood | null>(null);
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(false);

  const { language, updateLocation } = useAuthStore();
  const router = useRouter(); // For navigation

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Error",
          "Permission to access location was denied."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    })();
  }, []);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setSelectedNeighborhood(null); // Reset neighborhood
  };

  const handleNeighborhoodSelect = (neighborhood: Neighborhood) => {
    setSelectedNeighborhood(neighborhood);
  };

  const confirmAndRedirect = async () => {
    if (!selectedNeighborhood) return;
    setLoading(true);

    try {
      // Update global user location in the store
      updateLocation(
        selectedNeighborhood.latitude,
        selectedNeighborhood.longitude
      );

      // Show a confirmation alert
      Alert.alert(
        "Location Confirmed",
        `You selected ${selectedNeighborhood.name[language]}`,
        [
          {
            text: "OK",
            onPress: () => {
              router.push("/(root)/(tabs)/Home"); // Redirect to the homepage or another route
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to update location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCurrentLocation = () => {
    if (!userLocation) {
      Alert.alert(
        "Location Error",
        "Your current location is not available. Please try again."
      );
      return;
    }

    const { latitude, longitude } = userLocation.coords;

    updateLocation(latitude, longitude); // Update the global state with the current location

    Alert.alert(
      "Location Selected",
      "Your current location has been selected.",
      [
        {
          text: "OK",
          onPress: () => router.push("/(root)/(tabs)/Home"), // Redirect after selecting the location
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {language === "ar" ? "حدد موقعك" : "Select Your Address"}
      </Text>
      {/* City Selection */}
      <View style={styles.dropdown}>
        <Text style={styles.label}>
          {language === "ar" ? "المدينة" : "City"}
        </Text>
        <FlatList
          data={cities}
          keyExtractor={(item) => item.name}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.cityButton,
                selectedCity?.name === item.name && styles.selectedButton,
              ]}
              onPress={() => handleCitySelect(item)}
            >
              <Text style={styles.cityButtonText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* Neighborhood Selection */}
      {selectedCity && (
        <View style={styles.dropdown}>
          <Text style={styles.label}>
            {language === "ar" ? "الحي" : "Neighborhood"}
          </Text>
          <FlatList
            data={selectedCity.neighborhoods}
            keyExtractor={(item) => item.name.en}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.cityButton,
                  selectedNeighborhood?.name.en === item.name.en &&
                    styles.selectedButton,
                ]}
                onPress={() => handleNeighborhoodSelect(item)}
              >
                <Text style={styles.cityButtonText}>{item.name[language]}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude:
              selectedNeighborhood?.latitude ||
              userLocation?.coords.latitude ||
              21.585,
            longitude:
              selectedNeighborhood?.longitude ||
              userLocation?.coords.longitude ||
              39.206,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* User Marker */}
          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
              }}
              title={language === "ar" ? "موقعك" : "Your Location"}
              pinColor="blue"
            />
          )}

          {/* Neighborhood Marker */}
          {selectedNeighborhood && (
            <Marker
              coordinate={{
                latitude: selectedNeighborhood.latitude,
                longitude: selectedNeighborhood.longitude,
              }}
              title={selectedNeighborhood.name[language]}
              pinColor="green"
            />
          )}
        </MapView>
      </View>
      {/* Select Current Location Button */}
      <TouchableOpacity
        style={styles.currentLocationButton}
        onPress={handleSelectCurrentLocation}
      >
        <Text style={styles.currentLocationButtonText}>
          {language === "ar"
            ? "اختر موقعي الحالي"
            : "Select My Current Location"}
        </Text>
      </TouchableOpacity>
      {/* Confirm and Redirect Button */}
      {selectedNeighborhood && (
        <TouchableOpacity
          style={styles.directionButton}
          onPress={confirmAndRedirect}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.directionButtonText}>
              {language === "ar" ? "تأكيد" : "Confirm"}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  dropdown: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  cityButton: {
    marginHorizontal: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: "#007BFF",
    borderColor: "#0056b3",
  },
  cityButtonText: {
    color: "#000",
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  directionButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  directionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  currentLocationButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  currentLocationButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddressSelectionPage;
