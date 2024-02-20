import { useAuthContext } from "../hooks/useAuthContext";

const UserName = () => {
	const { user, dispatch } = useAuthContext();

	return <div>{user && <p>{user.username}</p>}</div>;
};

export default UserName;
