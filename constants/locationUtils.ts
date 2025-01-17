// src/utils/locationUtils.ts

/**
 * Calculates the distance in kilometers between two geographical points.
 * @param loc1 - The first location with latitude and longitude.
 * @param loc2 - The second location with latitude and longitude.
 * @returns The distance in kilometers, rounded to one decimal place.
 */
export const calculateDistanceInKm = (
  loc1: { lat: number; lon: number },
  loc2: { lat: number; lon: number }
): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLon = toRad(loc2.lon - loc1.lon);
  const lat1 = toRad(loc1.lat);
  const lat2 = toRad(loc2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1)); // Distance rounded to one decimal place
};

export default calculateDistanceInKm;
