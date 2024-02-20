import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useConversations = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const getConversations = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "http://localhost:5000/api/conversations/" + user.token
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    setIsLoading(false);
    return json;
  };

  const getConversation = async (idConv) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "http://localhost:5000/api/conversations/" + user._id + "/" + idConv,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    setIsLoading(false);
    return json;
  };

  const addUserInConversation = async (idConv, idUser) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "http://localhost:5000/api/conversations/" + idConv + "/add/" + idUser,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    setIsLoading(false);
    return json;
  };

  return {
    getConversation,
    getConversations,
    addUserInConversation,
    isLoading,
    error,
  };
};
