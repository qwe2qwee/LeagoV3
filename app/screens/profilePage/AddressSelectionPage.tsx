// app/screens/AddressSelection.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Platform,
  InteractionManager,
} from "react-native";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { cities, icons } from "@/constants";
import useAuthStore from "@/store/useAuthStore";
import { appwriteConfig } from "@/lib/appwrite/config";
import { push } from "expo-router/build/global-state/routing";

interface Neighborhood {
  name: {
    en: string;
    ar: string;
  };
  lat: number;
  lon: number;
}

interface City {
  name: string;
  neighborhoods: Neighborhood[];
}

const AddressSelectionPage = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showBottun, setShowButton] = useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<Neighborhood | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const { language, updateLocation, latitude, longitude } = useAuthStore();
  const router = useRouter();

  // Geoapify configuration
  const GEOAPIFY_STYLE = "osm-bright";
  const MAP_WIDTH = 600;
  const MAP_HEIGHT = 400;
  const ZOOM_LEVEL = 13;
  const DEFAULT_COORDS = {
    lat: latitude ? latitude : 21.585,
    lon: longitude ? longitude : 39.192,
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          showLocationError("permission");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        if (
          isValidCoordinate(location.coords.latitude, location.coords.longitude)
        ) {
          setUserLocation({
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          });
        }
      } catch (error) {
        showLocationError("access");
      }
    })();
  }, []);

  const handleshowButton = async () => {
    if (!userLocation) {
      console.error("User location is null, cannot update location");
      return;
    }

    setSelectedCity(null);
    setSelectedNeighborhood(null);

    try {
      setLoading(true);
      updateLocation(userLocation.lat, userLocation.lon);
      await InteractionManager.runAfterInteractions();
      setLoading(true);
      setTimeout(() => {
        setShowButton(true);
        setLoading(false);
        router.push("/(tabs)/Profile");
      }, 5000);
    } catch (error) {
      console.error("Error updating location", error);
    }
  };

  const isValidCoordinate = (lat: number, lon: number) =>
    !isNaN(lat) &&
    !isNaN(lon) &&
    lat >= -90 &&
    lat <= 90 &&
    lon >= -180 &&
    lon <= 180;

  const showLocationError = (errorType: "permission" | "access") => {
    const titles = {
      ar: { permission: "خطأ في الموقع", access: "خطأ في الوصول" },
      en: { permission: "Location Error", access: "Access Error" },
    };

    const messages = {
      ar: {
        permission: "تم رفض إذن الوصول إلى الموقع.",
        access: "تعذر الوصول إلى الموقع. حاول مرة أخرى.",
      },
      en: {
        permission: "Permission to access location was denied.",
        access: "Failed to access location. Please try again.",
      },
    };

    Alert.alert(titles[language][errorType], messages[language][errorType]);
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setSelectedNeighborhood(null);
  };

  const handleNeighborhoodSelect = (neighborhood: Neighborhood) => {
    setSelectedNeighborhood(neighborhood);
  };

  const confirmLocation = async () => {
    if (!selectedNeighborhood) return;
    setLoading(true);

    try {
      await updateLocation(selectedNeighborhood.lat, selectedNeighborhood.lon);

      Alert.alert(
        language === "ar" ? "تم التحديد" : "Location Confirmed",
        selectedNeighborhood.name[language],
        [{ text: "OK", onPress: () => router.push("/(tabs)") }]
      );
    } catch (error) {
      Alert.alert(
        language === "ar" ? "خطأ" : "Error",
        language === "ar"
          ? "فشل تحديث الموقع. حاول مرة أخرى."
          : "Failed to update location. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Simplified Image Component
  const renderMapImage = () => {
    const coords = selectedNeighborhood || userLocation || DEFAULT_COORDS;
    const mapUrl = `https://maps.geoapify.com/v1/staticmap?style=${GEOAPIFY_STYLE}&width=${MAP_WIDTH}&height=${MAP_HEIGHT}&zoom=${ZOOM_LEVEL}&center=lonlat:${coords.lon},${coords.lat}&apiKey=${appwriteConfig.EXPO_PUBLIC_GEOAPIFY_API_KEY}`;

    return (
      <Image
        source={{ uri: mapUrl }}
        style={styles.mapImage}
        onError={() =>
          Alert.alert(
            language === "ar" ? "خطأ في الخريطة" : "Map Error",
            language === "ar" ? "تعذر تحميل الخريطة" : "Failed to load map"
          )
        }
        defaultSource={icons.fallbackMap}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {language === "ar" ? "حدد موقعك" : "Select Your Address"}
      </Text>

      {/* City Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {language === "ar" ? "اختر المدينة" : "Select City"}
        </Text>
        <FlatList
          data={cities}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.selectionButton,
                selectedCity?.name === item.name && styles.selectedButton,
              ]}
              onPress={() => handleCitySelect(item)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedCity?.name === item.name && styles.buttonTextS,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Neighborhood Selection */}
      {selectedCity && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === "ar" ? "اختر الحي" : "Select Neighborhood"}
          </Text>
          <FlatList
            data={selectedCity.neighborhoods}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.name.en}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.selectionButton,
                  selectedNeighborhood?.name.en === item.name.en &&
                    styles.selectedButton,
                ]}
                onPress={() => handleNeighborhoodSelect(item)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedNeighborhood?.name.en === item.name.en &&
                      styles.buttonTextS,
                  ]}
                >
                  {item.name[language]}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Interactive Map Display */}
      <View style={styles.mapContainer}>
        <TouchableOpacity activeOpacity={0.9}>
          {renderMapImage()}
          <View style={styles.mapOverlay}>
            <Text style={styles.mapOverlayText}>
              {`${language === "ar" ? "الموقع" : "Location"}`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.currentLocationButton]}
          disabled={loading}
          onPress={handleshowButton}
        >
          <Text style={styles.actionButtonText}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.actionButtonText}>
                {language === "ar"
                  ? "استخدم الموقع الحالي"
                  : "Use Current Location"}
              </Text>
            )}
          </Text>
        </TouchableOpacity>

        {(selectedNeighborhood || showBottun) && (
          <TouchableOpacity
            style={[styles.actionButton, styles.confirmButton]}
            onPress={confirmLocation}
            disabled={loading}
            accessibilityLabel={
              language === "ar" ? "تأكيد الموقع" : "Confirm Location"
            }
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.actionButtonText}>
                {language === "ar" ? "تأكيد الموقع" : "Confirm Location"}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#1E293B",
    marginVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  selectionButton: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 6,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedButton: {
    backgroundColor: "#FF5C39",
  },
  buttonText: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "500",
  },
  buttonTextS: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  mapContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 16,
    backgroundColor: "#F1F5F9",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  mapOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.9)",
    paddingVertical: 12,
    alignItems: "center",
  },
  mapOverlayText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonContainer: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  currentLocationButton: {
    backgroundColor: "#FF5C39",
  },
  confirmButton: {
    backgroundColor: "#63666A",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default AddressSelectionPage;
