import { Alert } from "react-native";
import { useEffect, useState } from "react";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      const parsedDocs = response.map((doc) => ({
        id: doc?.$id,
        details: JSON.parse(doc?.deatals || "{}"), // Fallback to avoid parsing errors
        name: doc?.name,
        rentSalary: JSON.parse(doc?.rentSalary || "{}"),
        ownerId: doc?.ownerId,
        likes: doc?.likes,
        brand: doc?.company,
      }));

      // Filter out documents with IDs that already exist in state
      const filteredDocs = parsedDocs.filter((newDoc) => {
        return !data.some((existingDoc) => existingDoc.id === newDoc.id);
      });

      setData((prevData) => [...prevData, ...filteredDocs]); // Append new, non-duplicate data
    } catch (error) {
      Alert.alert("Error in fetch", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => {
    await fetchData();
  };

  return { data, isLoading, refetch, setData };
};

export default useAppwrite;
