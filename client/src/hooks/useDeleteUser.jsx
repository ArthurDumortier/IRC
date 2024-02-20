import { useState } from "react";

export const useDeleteUser = () => {
  const [errorDelete, setError] = useState(null);

  const deleteUser = async (userId, token) => {
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
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
        throw new Error(json.error || "Delete user failed");
      }
      return json;
    } catch (error) {
      setError(error.toString());
      return error;
    }
  };

  return { deleteUser, errorDelete };
};
