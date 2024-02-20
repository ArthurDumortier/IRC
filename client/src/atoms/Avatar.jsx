// Avatar.jsx
const Avatar = ({ profilPic }) => {
	return (
		<img
			src={profilPic ?? `https://api.dicebear.com/7.x/shapes/svg?seed=default`}
			alt="User Avatar"
			className="w-10 h-10 rounded-full object-cover"
			onError={(e) =>
				(e.target.src = `https://api.dicebear.com/7.x/shapes/svg?seed=default`)
			} // Fallback to a default seed if the provided URL fails to load
		/>
	);
};

export default Avatar;
