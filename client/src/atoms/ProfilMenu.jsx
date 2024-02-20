import { useState } from "react";
import { useBanSea } from "../hooks/useBanSea";
import { useLeaveSea } from "../hooks/useLeaveSea";

const ProfilMenu = ({ user, token, channel }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { banSea } = useBanSea();
  const { leaveSea } = useLeaveSea();

  async function handleKick(e) {
    const result = await leaveSea(channel._id, token, user._id);
    window.location.reload();
  }

  async function handleBan(e) {
    const resultKick = await leaveSea(channel._id, token, user._id);
    window.location.reload();
    const resultBan = await banSea(channel._id, token, user._id);
    window.location.reload();
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="inline-flex items-center p-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        id="options-menu"
        aria-expanded={isDropdownOpen ? "true" : "false"}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>

      <div
        className={`${
          isDropdownOpen ? "block" : "hidden"
        } origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-600`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-1 dark:hover:bg-gray-600">
          <button
            onClick={handleKick}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 "
          >
            Kick
          </button>
        </div>
        <div className="py-1 dark:hover:bg-gray-600">
          <button
            onClick={handleBan}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 "
          >
            Ban
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilMenu;
