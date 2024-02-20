import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/chats">Chats</Link>
        {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleClick}>Log Out</button>
          </div>
        )}
        {!user && (
          <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
