import { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return { ...state, user: action.payload };
		case "LOGOUT":
			return { ...state, user: null };
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, { user: null });
	const [isLoading, setIsLoading] = useState(true); // Follow loading of the user state

	useEffect(() => {
		revalidateUser();
	}, []);

	const revalidateUser = () => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			dispatch({ type: "LOGIN", payload: user });
		}
		setIsLoading(false); // Set loading to false after user is set
	};

	return (
		<AuthContext.Provider value={{ ...state, dispatch, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};
