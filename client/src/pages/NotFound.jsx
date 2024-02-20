import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 w-full">
			<h1 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
				Page Not Found
			</h1>
			<p className="text-base text-gray-600 dark:text-gray-300 mb-8">
				The page you're looking for doesn't exist or has been moved.
			</p>
			<div className="flex space-x-4">
				<Link
					to="/"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-800 transition duration-150 ease-in-out"
				>
					Go Home
				</Link>
				<Link
					to="/login"
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-green-600 dark:hover:bg-green-800 transition duration-150 ease-in-out"
				>
					Login
				</Link>
				<Link
					to="/signup"
					className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-purple-600 dark:hover:bg-purple-800 transition duration-150 ease-in-out"
				>
					Sign Up
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
