import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming using Expo or similar for icons

interface SearchBarProps {
  query: string;
  setQuery: (text: string) => void;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  handleSearch,
}) => {
  return (
    <View className="flex-row items-center justify-between m-2 p-2 bg-gray-100 rounded-lg">
      {/* Search Input */}
      <View className="flex-row items-center bg-gray-200 rounded-lg flex-1 px-2">
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          className="ml-2 p-2 flex-1 text-gray-700"
          placeholder="Search cars..."
          value={query}
          onChangeText={(text) => setQuery(text)}
          clearButtonMode="while-editing" // iOS only, for Android use close icon
          style={{ flex: 1 }} // Ensures TextInput takes up available space
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      {/* Search Button */}
      <TouchableOpacity
        onPress={handleSearch}
        disabled={!query.trim()} // Disable if input is empty
        className={`ml-2 p-1 py-3 w-1/6 rounded-lg ${
          query.trim() ? "bg-blue-500" : "bg-gray-300"
        }`}
        accessibilityLabel="Search for cars"
      >
        <Text className="text-center text-white font-semibold">Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
