import { useState } from "react";

export const useUpdateSea = () => {
  const [errorUpdate, setError] = useState(null);

  const updateSea = async (conversationId, token, title, description) => {
    console.log(conversationId, token, title, description);
    setError(null);
    try {
      const body = JSON.stringify({ title, description });

      const response = await fetch(
        `http://localhost:5000/api/conversations/${conversationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: body,
        }
      );
      const json = await response.json();

      console.log(json);
      if (!response.ok) {
        throw new Error(json.error || "Update sea failed");
      }
      return json;
    } catch (error) {
      setError(error.toString());
      return error;
    }
  };

  return { updateSea, errorUpdate };
};
