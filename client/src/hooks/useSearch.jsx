import { useState } from "react";

export const useSearch = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Initialize as false

  const results = async (title, token, userId) => {
    setIsLoading(true);
    setError(null);

    console.log(title, token, userId);
    try {
      const response = await fetch(
        "http://localhost:5000/api/conversations/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, userId }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (!response.ok) {
        throw new Error(json.error || "Search failed");
      }
      setIsLoading(false);
      return json; // Return the search results
    } catch (error) {
      setError(error.toString());
      setIsLoading(false);
      return error;
    }
  };

  return { results, isLoading, error };
};
