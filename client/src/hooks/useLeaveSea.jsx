import { useState } from "react";

export const useLeaveSea = () => {
  const [errorLeave, setError] = useState(null);

  const leaveSea = async (conversationId, token, userId) => {
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/conversations/${conversationId}/remove/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Leave sea failed");
      }
      return json;
    } catch (error) {
      setError(error.toString());
      return error;
    }
  };

  return { leaveSea, errorLeave };
};
