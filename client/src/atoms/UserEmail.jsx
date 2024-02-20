import { useAuthContext } from "../hooks/useAuthContext";
const UserEmail = () => {
	const { user, dispatch } = useAuthContext();

	return <div>{user && <p>{user.email}</p>}</div>;
};

export default UserEmail;
