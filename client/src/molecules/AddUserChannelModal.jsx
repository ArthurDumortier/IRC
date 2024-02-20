import { useUser } from "../hooks/useUser";
import { useConversations } from "../hooks/useConversations";
import { useEffect, useState } from "react";
import { useBanSea } from "../hooks/useBanSea";
import Avatar from "../atoms/Avatar";

const AddUserModal = ({ channel, user, isOpen, onClose }) => {
  const [users, setUsers] = useState([]);
  const { getUsers } = useUser();
  const { addUserInConversation } = useConversations();
  const { unBanSea } = useBanSea();

  async function handleAddUser(theUser) {
    const result = await addUserInConversation(channel._id, theUser._id);
    window.location.reload();
  }

  async function handleUnban(theUser) {
    const result = await unBanSea(channel._id, user.token, theUser._id);
    window.location.reload();
  }
  useEffect(() => {
    const fetchData = async () => {
      const allUser = await getUsers();
      setUsers(allUser);
    };

    fetchData();
  }, [isOpen]);

  return (
    <div
      className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="relative bg-white rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Add a user !
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <ul className="p-4 md:p-5">
            {users.map((theUser) => {
              const isAlreadyIn = channel.participants.some(
                (userId) => userId.userId === theUser._id
              );

              const isBan = channel.blacklist.some(
                (userId) => userId.user === theUser._id
              );

              return (
                <li
                  key={theUser._id}
                  className="flex justify-evenly text-center"
                >
                  <Avatar profilPic={theUser.profilPic} />
                  <div className="text-gray-900">{theUser.username}</div>
                  {isBan ? (
                    <button
                      onClick={async (e) => await handleUnban(theUser)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded disabled:opacity-50"
                    >
                      Unban
                    </button>
                  ) : (
                    <button
                      disabled={isAlreadyIn}
                      onClick={async (e) => await handleAddUser(theUser)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded disabled:opacity-50"
                    >
                      {isAlreadyIn ? "Already in" : "Join"}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
