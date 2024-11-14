import { arabicToEnglishMap, modelToBrandMap } from "./modelData";

// Function to find brand by exact or partial model name
export function findBrandByPartialModel(
  partialModel: string
): { brandName: string; nameItself: string } | null {
  // Convert partialModel to lowercase for case-insensitive matching
  const normalizedPartialModel = partialModel.toLowerCase();

  // Check for an exact match
  if (modelToBrandMap[partialModel]) {
    return {
      brandName: modelToBrandMap[partialModel],
      nameItself: partialModel,
    };
  }

  // Search for partial matches in a case-insensitive manner
  const possibleMatches = Object.keys(modelToBrandMap).filter((model) =>
    model.toLowerCase().includes(normalizedPartialModel)
  );

  // If there are matches, return an object with the brand and model name of the longest match
  if (possibleMatches.length > 0) {
    const closestMatch = possibleMatches.reduce((a, b) =>
      a.length > b.length ? a : b
    );
    return {
      brandName: modelToBrandMap[closestMatch],
      nameItself: closestMatch,
    };
  }

  // Return null if no match is found
  return null;
}

// Function to get English model name
export function getEnglishModelName(modelName: string): string | any {
  // Check if the model name is in Arabic and map to English
  if (arabicToEnglishMap[modelName]) {
    return arabicToEnglishMap[modelName];
  }

  // If the model name is already in English, return it if it exists in the map
  if (modelToBrandMap[modelName]) {
    return modelName;
  }

  // Return null if no match is found
  return null;
}
