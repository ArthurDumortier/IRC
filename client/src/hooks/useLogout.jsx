import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    // Clear user data from local storage
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    // Redirect to login page
    navigate("/login");
  };

  return { logout };
};
