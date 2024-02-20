import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import leoProfanity from "leo-profanity";
import frenchBadwordsList from "french-badwords-list";

export const useMessages = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const getMessages = async (id) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:5000/api/Messages/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    setIsLoading(false);
    return json;
  };

  const postMessage = async (idConversation, content) => {
    setIsLoading(true);
    setError(null);
    leoProfanity.add(frenchBadwordsList.array);

    const cleanedContent = leoProfanity.clean(content);

    const response = await fetch(
      "http://localhost:5000/api/Messages/" + idConversation,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          content: cleanedContent,
          userId: user._id,
        }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    setIsLoading(false);
    return json;
  };

  const deleteMessage = async (messageId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${messageId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error || "Failed to delete the message");
      }

      setIsLoading(false);
      return true; // Successfully deleted
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      return false; // Failed to delete
    }
  };

  return { postMessage, getMessages, deleteMessage, isLoading, error };
};
