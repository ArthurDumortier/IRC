import { useState } from "react";

export const useUpdateUser = () => {
  const [errorUpdate, setError] = useState(null);

  const updateUser = async (userId, token, username, email, bio) => {
    setError(null);
    try {
      const body = JSON.stringify({ username, email, bio });

      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
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

      // Mettre a jour le localStorage avec les nouvelles informations
      if (response.ok) {
        const user = JSON.parse(localStorage.getItem("user"));
        user.username = username;
        user.email = email;
        user.bio = bio;
        localStorage.setItem("user", JSON.stringify(user));
      }

      if (!response.ok) {
        throw new Error(json.error || "Update user failed");
      }

      return json;
    } catch (error) {
      setError(error.toString());
      return error;
    }
  };

  return { updateUser, errorUpdate };
};
