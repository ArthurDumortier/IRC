import Logo from "../atoms/Logo";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ThemeToggle from "../atoms/ThemeToggle";
import NavTree from "../molecules/NavTree";
import UserConnectionInfo from "../molecules/UserConnectionInfo";
import CreateSeaModal from "../molecules/CreateSeaModal";

const Sidebar = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user } = useAuthContext();

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className="flex flex-col w-64 h-screen bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col items-center mt-10">
        <ThemeToggle />
        <Logo />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white mt-2">
          Dolphin Chat
        </span>
        <UserConnectionInfo />
        <NavTree />
        {user && (
          <>
            <CreateSeaModal
              isOpen={isCreateModalOpen}
              onClose={closeCreateModal}
            />
            <button
              onClick={() => setIsCreateModalOpen(!isCreateModalOpen)}
              className="flex items-center mt-4 py-2 px-6 text-gray-900 dark:text-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span className="mx-3 dark:hover:bg-gray-900 rounded-2xl">
                Create Sea
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
