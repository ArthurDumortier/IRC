import { useState } from "react";

export const useCreateSea = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createSea = async (title, description, token, userId) => {
    setIsLoading(true);
    setError(null);
    try {
      const body =
        description === ""
          ? JSON.stringify({ title })
          : JSON.stringify({ title, description });

      const response = await fetch(
        `http://localhost:5000/api/conversations/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: body,
        }
      );
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Create sea failed");
      }
      setIsLoading(false);
      return json;
    } catch (error) {
      setError(error.toString());
      setIsLoading(false);
      return error;
    }
  };

  return { createSea, isLoading, error };
};
