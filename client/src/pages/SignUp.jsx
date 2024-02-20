import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuthContext();
  const { signup, error, isLoading } = useSignup();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(email, username, password);
    if (res) {
      navigate("/chats");
    }
  };

  return !user ? (
    <div className="container min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
      <form className="w-full max-w-xs" onSubmit={handleSubmit}>
        <h1 className="text-xl mb-5 text-center text-gray-800 dark:text-gray-200">
          Sign Up
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
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            Sign Up
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

export default SignUp;
