import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useUpdateUser } from "../hooks/useUpdateUser";

const Profile = () => {
  const { user, setUser } = useAuthContext();
  const { updateUser, errorUpdate } = useUpdateUser();
  const { deleteUser, errorDelete } = useDeleteUser();

  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedBio, setEditedBio] = useState("");

  // Effect to set initial values once user is loaded
  useEffect(() => {
    if (user) {
      setEditedUsername(user.username);
      setEditedEmail(user.email);
      setEditedBio(user.bio);
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const res = await updateUser(
      user._id,
      user.token,
      editedUsername,
      editedEmail,
      editedBio
    );
    if (res) {
      setIsEditing(false);
      window.location.reload();
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    // Delete user
    const windowConfirm = window.confirm(
      "Etes-vous sûr de vouloir supprimer ?"
    );
    if (windowConfirm) {
      const res = await deleteUser(user._id, user.token);
      if (res) {
        // Logout
        localStorage.removeItem("user");
        window.location = "/login";
      }
    }
  };

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 h-3/4 bg-white rounded-lg dark:bg-gray-800 shadow-md max-h-screen overflow-y-auto">
      <div className="flex items-center justify-center">
        <img
          src={user.profilPic}
          alt="Profile"
          className="rounded-full w-24 h-24 mr-4"
        />
        <div>
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
                className="text-3xl font-semibold w-full mb-2 dark:bg-gray-900  dark:text-white text-gray-900"
              />
              <input
                type="text"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="text-3xl font-semibold w-full mb-2 dark:text-white dark:bg-gray-900 text-gray-900"
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-semibold dark:text-white text-gray-900">
                {user.username}
              </h1>

              <p className="text-gray-500  dark:text-white">{user.email}</p>
            </>
          )}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 dark:text-white">Bio:</h2>
        {isEditing ? (
          <textarea
            value={editedBio}
            onChange={(e) => setEditedBio(e.target.value)}
            className="w-full mb-2 dark:text-white dark:bg-gray-900 text-gray-900"
          />
        ) : (
          <p className="text-gray-600 dark:text-white">{user.bio}</p>
        )}
      </div>

      <div className="mt-6">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Edit Profile
          </button>
        )}

        {/* Bouton de suppression */}
        <button
          onClick={handleDelete}
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
