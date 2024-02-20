import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const getUser = async (id) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:5000/api/users/" + id, {
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

  const getUsers = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:5000/api/users/", {
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

  return { getUser, getUsers, isLoading, error };
};
