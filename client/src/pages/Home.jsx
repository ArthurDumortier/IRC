import { Link } from "react-router-dom";
import Logo from "../atoms/Logo";

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
      <Logo />
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
        DolphinChat App
      </h1>
      <p className="text-md md:text-lg text-gray-600 dark:text-gray-300 text-center mb-8 max-w-md">
        Join DolphinChat to connect with dolphins from around the world. Share
        your stories, make new friends, and dive into conversations.
      </p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-800 transition duration-150 ease-in-out w-full text-center flex items-center justify-center"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-green-600 dark:hover:bg-green-800 transition duration-150 ease-in-out w-full text-center flex items-center justify-center"
        >
          SignUp
        </Link>
      </div>
      <Link
        to="/chats"
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-purple-600 dark:hover:bg-purple-800 transition duration-150 ease-in-out flex items-center justify-center"
      >
        Dive with other dolphins
      </Link>
    </div>
  );
};

export default Home;
