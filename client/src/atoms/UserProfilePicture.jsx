import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const UserProfilePicture = () => {
  const { user } = useAuthContext();

  return (
    <div>
      {user && user.profilPic && (
        <Link to="/profile">
          <img
            src={user.profilPic}
            alt="User Profile"
            className="rounded-full w-12 h-12 hover:opacity-80 transition duration-200 cursor-pointer"
          />
        </Link>
      )}
    </div>
  );
};

export default UserProfilePicture;
