import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSearchStore } from "@/store/SearchState";

interface SearchBarProps {
  handleSearch: () => void;
  loading: boolean;
  reest: () => void;
  isArabic?: boolean; // Language toggle
}

const SearchBar: React.FC<SearchBarProps> = ({
  handleSearch,
  loading,
  isArabic = false,
  reest,
}) => {
  const { query, setQuery, clearQuery } = useSearchStore();

  const placeholderText = isArabic ? "ابحث عن السيارات..." : "Search cars...";
  const searchButtonText = isArabic ? "بحث" : "Search";
  const accessibilityLabelInput = isArabic
    ? "أدخل اسم السيارة أو موديلها"
    : "Enter car name or model";
  const accessibilityLabelClear = isArabic
    ? "مسح إدخال البحث"
    : "Clear search input";
  const accessibilityLabelSearch = isArabic
    ? "قم بالبحث عن السيارات"
    : "Perform search for cars";

  return (
    <View
      className="flex-row items-center justify-between m-2 p-2 bg-gray-100 rounded-lg"
      accessible
      accessibilityRole="search"
      accessibilityLabel={
        isArabic ? "شريط البحث عن السيارات" : "Search bar for cars"
      }
      style={{
        flexDirection: isArabic ? "row-reverse" : "row", // RTL support
      }}
    >
      {/* Search Input */}
      <View
        className="flex-row items-center bg-gray-200 rounded-lg flex-1 px-2"
        style={{
          flexDirection: isArabic ? "row-reverse" : "row", // RTL support
        }}
      >
        <Ionicons
          name="search"
          size={20}
          color="gray"
          style={{
            marginLeft: isArabic ? 0 : 8,
            marginRight: isArabic ? 8 : 0,
          }}
        />
        <TextInput
          className="ml-2 p-3 flex-1 text-gray-700"
          placeholder={placeholderText}
          placeholderTextColor="gray"
          value={query}
          onChangeText={setQuery}
          accessibilityLabel={accessibilityLabelInput}
          style={{
            flex: 1,
            textAlign: isArabic ? "right" : "left", // Align text for RTL
          }}
        />
        {query.length > 0 && !loading && (
          <TouchableOpacity
            onPress={reest}
            accessible
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabelClear}
          >
            <Ionicons name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      {/* Search Button */}
      <TouchableOpacity
        onPress={handleSearch}
        disabled={!query.trim() || loading} // Disable during loading
        className={`ml-2 p-1 py-3 w-1/6 rounded-lg  ${
          query.trim() && !loading ? "bg-primary-400" : "bg-gray-300"
        }`}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabelSearch}
        style={{
          marginLeft: isArabic ? 0 : 8,
          marginRight: isArabic ? 8 : 0,
        }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text
            className={` text-center text-white ${
              isArabic ? "font-ZainBold " : "font-MontserratMedium "
            }`}
          >
            {searchButtonText}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
