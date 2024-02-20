import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import LoadingSpinner from "./atoms/LoadingSpinner";

const ProtectedRoute = () => {
	const { user, isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
