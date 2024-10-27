// File: components/CarGrid.tsx
import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome for the heart icon

interface Car {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  carLocation: { lat: number; lon: number }; // Car location with latitude and longitude
  city: string;
  ownerId: string;
  details: string; // JSON string that needs parsing
  likes: number;
  hide: boolean;
}

interface CarGridProps {
  selectedBrand: string | null;
  userLocation: { lat: number; lon: number }; // User's location to find nearby cars
}

const mockCars: Car[] = [
  {
    id: 1,
    brand: "Toyota",
    name: "Camry",
    price: "$20,000",
    image:
      "https://th.bing.com/th/id/R.8b01377204f7e5e60f3928fa9c6d8d8d?rik=veNTNapnhdPf5A&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-hd-images-of-cars-volkswagen-png-hd-1500.png&ehk=bzMQ1ueAXMsJzhilqNehN77R9uwSPUm8hoyg%2bCU3wYo%3d&risl=&pid=ImgRaw&r=0",
    carLocation: { lat: 34.0522, lon: -118.2437 },
    city: "Los Angeles",
    ownerId: "123",
    details: '{"mileage": "20,000 miles", "year": "2018", "color": "Red"}',
    likes: 120,
    hide: false,
  },
  {
    id: 2,
    brand: "Toyota",
    name: "Camry",
    price: "$20,000",
    image:
      "https://th.bing.com/th/id/R.8b01377204f7e5e60f3928fa9c6d8d8d?rik=veNTNapnhdPf5A&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-hd-images-of-cars-volkswagen-png-hd-1500.png&ehk=bzMQ1ueAXMsJzhilqNehN77R9uwSPUm8hoyg%2bCU3wYo%3d&risl=&pid=ImgRaw&r=0",
    carLocation: { lat: 34.0522, lon: -118.2437 },
    city: "Los Angeles",
    ownerId: "123",
    details: '{"mileage": "20,000 miles", "year": "2018", "color": "Red"}',
    likes: 120,
    hide: false,
  },
  {
    id: 3,
    brand: "Toyota",
    name: "Camry",
    price: "$20,000",
    image:
      "https://th.bing.com/th/id/R.8b01377204f7e5e60f3928fa9c6d8d8d?rik=veNTNapnhdPf5A&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-hd-images-of-cars-volkswagen-png-hd-1500.png&ehk=bzMQ1ueAXMsJzhilqNehN77R9uwSPUm8hoyg%2bCU3wYo%3d&risl=&pid=ImgRaw&r=0",
    carLocation: { lat: 34.0522, lon: -118.2437 },
    city: "Los Angeles",
    ownerId: "123",
    details: '{"mileage": "20,000 miles", "year": "2018", "color": "Red"}',
    likes: 120,
    hide: false,
  },
  {
    id: 4,
    brand: "Toyota",
    name: "Camry",
    price: "$20,000",
    image:
      "https://th.bing.com/th/id/R.8b01377204f7e5e60f3928fa9c6d8d8d?rik=veNTNapnhdPf5A&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-hd-images-of-cars-volkswagen-png-hd-1500.png&ehk=bzMQ1ueAXMsJzhilqNehN77R9uwSPUm8hoyg%2bCU3wYo%3d&risl=&pid=ImgRaw&r=0",
    carLocation: { lat: 21.680871, lon: -320.904937 },
    city: "عند البحر الاحمر",
    ownerId: "123",
    details: '{"mileage": "20,000 miles", "year": "2018", "color": "Red"}',
    likes: 120,
    hide: false,
  },
  {
    id: 5,
    brand: "Toyota",
    name: "Camry",
    price: "$20,000",
    image:
      "https://th.bing.com/th/id/R.8b01377204f7e5e60f3928fa9c6d8d8d?rik=veNTNapnhdPf5A&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-hd-images-of-cars-volkswagen-png-hd-1500.png&ehk=bzMQ1ueAXMsJzhilqNehN77R9uwSPUm8hoyg%2bCU3wYo%3d&risl=&pid=ImgRaw&r=0",
    carLocation: { lat: 21.764809, lon: -320.801359 },
    city: "في الحمدانية",
    ownerId: "123",
    details: '{"mileage": "20,000 miles", "year": "2018", "color": "Red"}',
    likes: 120,
    hide: false,
  },
  {
    id: 6,
    brand: "Toyota",
    name: "Camry",
    price: "$20,000",
    image:
      "https://th.bing.com/th/id/R.8b01377204f7e5e60f3928fa9c6d8d8d?rik=veNTNapnhdPf5A&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-hd-images-of-cars-volkswagen-png-hd-1500.png&ehk=bzMQ1ueAXMsJzhilqNehN77R9uwSPUm8hoyg%2bCU3wYo%3d&risl=&pid=ImgRaw&r=0",
    carLocation: { lat: 21.588537, lon: -320.808197 },
    city: " في الصفا",
    ownerId: "123",
    details: '{"mileage": "20,000 miles", "year": "2018", "color": "Red"}',
    likes: 120,
    hide: false,
  },
  // Add more mock data here if needed
];

// Helper function to parse car details
const parseDetails = (details: string) => {
  try {
    return JSON.parse(details);
  } catch (error) {
    console.error("Error parsing details:", error);
    return {};
  }
};

// Placeholder function to calculate distance (Haversine Formula or basic distance calculation)
const calculateDistance = (
  loc1: { lat: number; lon: number },
  loc2: { lat: number; lon: number }
) => {
  // For simplicity, we're calculating Euclidean distance, but you can use Haversine for accuracy.
  return Math.sqrt(
    Math.pow(loc2.lat - loc1.lat, 2) + Math.pow(loc2.lon - loc1.lon, 2)
  );
};

const CarGrid: React.FC<CarGridProps> = ({ selectedBrand, userLocation }) => {
  const [filteredCars, setFilteredCars] = useState<Car[]>(mockCars);
  const [likedCars, setLikedCars] = useState<number[]>([]); // Array to track liked cars by their ID

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    let filteredList = mockCars.filter((car) => !car.hide); // Exclude hidden cars

    // Filter by brand if selected
    if (selectedBrand) {
      filteredList = filteredList.filter((car) => car.brand === selectedBrand);
    }

    // Sort cars by proximity to the user's location
    filteredList.sort((a, b) => {
      const distanceA = calculateDistance(userLocation, a.carLocation);
      const distanceB = calculateDistance(userLocation, b.carLocation);
      return distanceA - distanceB;
    });

    setFilteredCars(filteredList);
  }, [selectedBrand, userLocation]);

  const toggleLike = (carId: number) => {
    setLikedCars((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId]
    );
  };

  const renderItem = ({ item, index }: { item: Car; index: number }) => {
    const isSingleItem = filteredCars.length === 1;
    const isLastInRow = filteredCars.length === 3 && index === 2; // For three items, check if it's the last item
    const carDetails = parseDetails(item.details);

    return (
      <View
        className={`bg-white m-2 p-4 rounded-lg shadow relative ${isSingleItem ? "flex-row" : ""}`}
        style={
          isSingleItem
            ? { width: screenWidth - 32, alignItems: "center" }
            : isLastInRow
              ? { flex: 1, marginLeft: screenWidth / 8 } // Center align the third item when there are 3 items
              : { flex: 1 }
        }
      >
        <Image
          source={{ uri: item.image }}
          className={
            isSingleItem
              ? "h-24 w-24 rounded-lg mr-4"
              : "h-24 w-full rounded-lg"
          }
          resizeMode="contain"
        />
        <View className={isSingleItem ? "flex-1" : ""}>
          <Text className="text-lg font-bold mt-2">{item.name}</Text>
          <Text className="text-sm text-gray-500">{item.brand}</Text>
          <Text className="text-sm text-green-600">{item.price}/شهري</Text>
          <Text className="text-sm text-gray-500">{`City: ${item.city}`}</Text>
          <Text className="text-sm text-gray-500">{`Mileage: ${carDetails.mileage}`}</Text>
          <Text className="text-sm text-gray-500">{`Year: ${carDetails.year}`}</Text>
        </View>
        <TouchableOpacity
          onPress={() => toggleLike(item.id)}
          style={{ position: "absolute", top: 8, right: 8 }}
        >
          <Icon
            name={likedCars.includes(item.id) ? "heart" : "heart-o"}
            size={24}
            color={likedCars.includes(item.id) ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={filteredCars}
      scrollEnabled={false}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default CarGrid;
