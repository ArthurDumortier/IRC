import { useState } from "react";

export const useBanSea = () => {
  const [errorLeave, setError] = useState(null);

  const banSea = async (conversationId, token, userId) => {
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/conversations/${conversationId}/blacklist/${userId}`,
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
        throw new Error(json.error || "Ban sea failed");
      }
      return json;
    } catch (error) {
      setError(error.toString());
      return error;
    }
  };

  const unBanSea = async (conversationId, token, userId) => {
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/conversations/${conversationId}/removeBlacklist/${userId}`,
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
        throw new Error(json.error || "Ban sea failed");
      }
      return json;
    } catch (error) {
      setError(error.toString());
      return error;
    }
  };

  return { banSea, unBanSea, errorLeave };
};
