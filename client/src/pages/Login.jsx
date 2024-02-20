import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, error, isLoading } = useLogin();
	const { user } = useAuthContext();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await login(email, password);
		if (res) {
			navigate("/chats"); // Redirect to chats page
		}
	};

	return !user ? (
		<div className="container min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
			<form className="w-full max-w-xs" onSubmit={handleSubmit}>
				<h1 className="text-xl mb-5 text-center text-gray-800 dark:text-gray-200">
					Login
				</h1>
				<div className="mb-4">
					<label
						className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
						htmlFor="email"
					>
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
						id="email"
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
						htmlFor="password"
					>
						Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
						id="password"
						type="password"
						placeholder="******************"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-800"
						type="submit"
						disabled={isLoading}
					>
						Log in
					</button>
				</div>
				{error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
			</form>
		</div>
	) : (
		<div className="container min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
			<h1 className="text-xl mb-5 text-center text-gray-800 dark:text-gray-200">
				You are already logged in
			</h1>
			<Link
				to="/chats"
				className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-purple-600 dark:hover:bg-purple-800 transition duration-150 ease-in-out"
			>
				Chat with other dolphins
			</Link>
		</div>
	);
};
export default Login;
