import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCreateSea } from "../hooks/useCreateSea";
import { useNavigate } from "react-router-dom";

const CreateSeaModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { createSea, isLoading, error } = useCreateSea(
    title,
    description,
    user.id
  );

  const handleCreateSea = async (e) => {
    e.preventDefault();
    if (title) {
      const res = await createSea(title, description, user.token, user._id);
      if (res) {
        onClose();
        window.location.reload();
      }
    }
  };

  return (
    <div
      className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg outline-none focus:outline-none text-gray-900 dark:text-white">
          <div className="flex items-center justify-between p-4 md:p-5 border-b dark:border-gray-700 border-gray-300 rounded-t">
            <h3 className="text-xl font-semibold">Create your sea!</h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent dark:hover:bg-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
          <div className="p-4 md:p-5">
            <form className="space-y-4" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Your sea title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Your sea description"
                  className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="text-sm font-medium">
                <button
                  onClick={handleCreateSea}
                  disabled={isLoading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  {isLoading ? "Creating..." : "Create Sea"}
                </button>
                {error && (error.message || error)}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSeaModal;
