import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const ChannelList = () => {
  const [channels, setChannels] = useState([]);
  const { user } = useAuthContext();

  if (user) {
    useEffect(() => {
      const getConversations = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/conversations/${user._id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch channels");
          }
          const data = await response.json();
          setChannels(data);
        } catch (error) {
          console.error(error);
        }
      };

      if (user._id) {
        getConversations();
      }
    }, [user._id, user.token]);
    return { channels };
  }
};

export default ChannelList;
