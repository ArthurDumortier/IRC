import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { useAuthContext } from "../hooks/useAuthContext";
import AddUserModal from "./AddUserChannelModal";
import ProfilMenu from "../atoms/ProfilMenu";
import { useLeaveSea } from "../hooks/useLeaveSea";
import { useDeleteSea } from "../hooks/useDeleteSea";
import { useUpdateSea } from "../hooks/useUpdateSea";

const ChannelProfil = ({ channel }) => {
  const [isAddUserModal, setIsAddUserModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const { getUser } = useUser();
  const { user } = useAuthContext();
  const { leaveSea, errorLeave } = useLeaveSea();
  const { deleteSea, errorDelete } = useDeleteSea();
  const { updateSea, errorUpdate } = useUpdateSea();

  const closeAddUserModal = () => {
    setIsAddUserModal(false);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(channel.title);
  const [editedDescription, setEditedDescription] = useState(
    channel.description
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const res = await updateSea(
      channel._id,
      user.token,
      editedTitle,
      editedDescription
    );

    if (res) {
      window.location.reload();
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    // Réinitialiser les valeurs éditées
    setEditedTitle(channel.title);
    setEditedDescription(channel.description);
    // Désactiver le mode d'édition
    setIsEditing(false);
  };

  const handleLeaveChannel = async (e) => {
    e.preventDefault();
    if (channel.participants.length === 1) {
      const confirmLeave = window.confirm(
        "Souhaitez-vous vraiment quitter ? Vous êtes le dernier participant, le channel sera supprimé."
      );
      if (confirmLeave) {
        const res = await deleteSea(channel._id, user.token);
        if (res) {
          window.location.reload();
        }
      }
    } else {
      const res = await leaveSea(channel._id, user.token, user._id);
      if (res) {
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const allUser = [];
      for (const userChannel of channel.participants) {
        if (user._id === userChannel.userId && userChannel.role === "Admin") {
          setIsAdmin(true);
        }
        const newUser = await getUser(userChannel.userId);
        allUser.push(newUser);
      }
      setUsers(allUser);
    };

    fetchData();
  }, [channel]);

  return (
    <div className="flex flex-col">
      <div className="font-semibold dark:text-white text-xl py-4">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
            placeholder="Title"
            className="border border-gray-300 dark:text-white dark:bg-gray-800 dark:border-gray-700 rounded-md p-2 mb-2"
          />
        ) : (
          channel.title
        )}
      </div>
      <img
        src={channel.picture}
        className="object-cover rounded-xl h-64"
        alt=""
      />
      <div className="text-gray-900 dark:text-white">
        Created at: {new Date(channel.createdAt).toLocaleString()}
      </div>
      <div className="text-gray-500 dark:text-gray-200">
        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={handleDescriptionChange}
            placeholder="Description"
            className="border border-gray-300 dark:text-white dark:bg-gray-800 dark:border-gray-700 rounded-md p-2 mb-2"
          ></textarea>
        ) : (
          channel.description
        )}
      </div>
      <ul className="flex flex-col content-center border-t-2 border-gray-200 pt-1">
        {users.map((user) => (
          <li key={user._id} className="flex items-center justify-around mb-1">
            <img
              src={user.profilPic}
              alt="User Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>{user.username}</div>
            {isAdmin && <ProfilMenu user={user} channel={channel} />}
          </li>
        ))}
      </ul>
      <span className="border-b-2 m-1"></span>

      <div className="flex justify-center items-center mt-4">
        {isAdmin && (
          <>
            <button
              onClick={() => setIsAddUserModal(true)}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Add User
            </button>
            <AddUserModal
              channel={channel}
              isOpen={isAddUserModal}
              onClose={closeAddUserModal}
            />
          </>
        )}
        {isAdmin && !isEditing && (
          <button
            onClick={handleEdit}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Edit Channel
          </button>
        )}
        {isAdmin && isEditing && (
          <div>
            <button
              onClick={handleSave}
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Cancel
            </button>
          </div>
        )}

        <button
          onClick={handleLeaveChannel}
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Leave Channel
        </button>
      </div>
      <span className="border-b-2 dark:border-gray-200"></span>
    </div>
  );
};

export default ChannelProfil;
