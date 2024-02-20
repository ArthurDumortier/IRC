import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

import UserProfilePicture from "../atoms/UserProfilePicture";

const UserConnectionInfo = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <div className="flex flex-col items-center justify-center text-center my-4">
      {user ? (
        <>
          <div className="flex flex-col items-center mb-4 text-gray-900 dark:text-gray-100">
            <UserProfilePicture />
          </div>
          <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-2 rounded transition duration-200"
          >
            Log Out
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <Link
            to="/signup"
            className="px-4 py-2 border rounded-lg hover:text-blue-500 dark:hover:text-blue-400 transition duration-200 bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 border rounded-lg hover:text-blue-500 dark:hover:text-blue-400 transition duration-200 bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserConnectionInfo;
