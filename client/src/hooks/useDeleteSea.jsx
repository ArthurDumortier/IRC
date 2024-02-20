import { useState } from "react";

export const useDeleteSea = () => {
  const [errorDelete, setError] = useState(null);

  const deleteSea = async (conversationId, token) => {
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/conversations/${conversationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Delete sea failed");
      }
      return json;
    } catch (error) {
      setError(error.toString());
      return error;
    }
  };

  return { deleteSea, errorDelete };
};
