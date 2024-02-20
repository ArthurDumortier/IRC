import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDeleteSea } from "../hooks/useDeleteSea";
import { useNavigate } from "react-router-dom";
import { useUpdateSea } from "../hooks/useUpdateSea";
import { useLeaveSea } from "../hooks/useLeaveSea";

const ConversationMenu = ({ isOpen, toggleDropdown, theChannel }) => {
  const { user } = useAuthContext();
  const channel = theChannel;
  const { deleteSea, errorDelete } = useDeleteSea();
  const navig = useNavigate();
  const { updateSea, errorUpdate } = useUpdateSea();
  const { leaveSea, errorLeave } = useLeaveSea();

  const isAdmin = channel.participants.some(
    (participant) =>
      participant.userId === user._id && participant.role === "Admin"
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(channel.title);
  const [editedDescription, setEditedDescription] = useState(
    channel.description
  );

  const deleteChannel = async (e) => {
    e.preventDefault();
    const res = await deleteSea(theChannel._id, user.token);
    if (res) {
      // Refresh pages Chats
      navig("/chats");
    }
  };

  const leaveChannel = async (e) => {
    e.preventDefault();
    if (channel.participants.length === 1) {
      const confirmLeave = window.confirm(
        "Souhaitez-vous vraiment quitter ? Vous êtes le dernier participant, le channel sera supprimé."
      );
      if (confirmLeave) {
        deleteChannel(e);
      }
    } else {
      const res = await leaveSea(theChannel._id, user.token, user._id);
      if (res) {
        // Refresh pages Chats
        navig("/chats");
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleSave = () => {
    const res = updateSea(
      theChannel._id,
      user.token,
      editedTitle,
      editedDescription
    );
    setIsEditing(false);

    if (res) {
      navig("/chats");
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center p-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        id="options-menu"
        aria-expanded={isOpen ? "true" : "false"}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-600`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {isAdmin && !isEditing && (
          <>
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                onClick={handleEdit}
              >
                Edit
              </a>
            </div>
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                onClick={deleteChannel}
              >
                Delete
              </a>
            </div>
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                onClick={leaveChannel}
              >
                Leave
              </a>
            </div>
          </>
        )}

        {isAdmin && isEditing && (
          <>
            <div className="py-1">
              <input
                type="text"
                className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:bg-gray-800"
                value={editedTitle}
                onChange={handleTitleChange}
              />
            </div>
            <div className="py-1">
              <input
                type="text"
                className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:bg-gray-800"
                value={editedDescription}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="py-1">
              <button
                onClick={handleSave}
                className="block w-full px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
              >
                Save
              </button>
            </div>
            <div className="py-1">
              <button
                onClick={() => setIsEditing(false)}
                className="block w-full px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {!isAdmin && (
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
              onClick={leaveChannel}
            >
              Leave
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationMenu;
