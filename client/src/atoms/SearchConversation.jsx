import { useSearch } from "../hooks/useSearch.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useState } from "react";

const SearchConversation = () => {
  const [title, setTitle] = useState("");
  const { results, isLoading, error } = useSearch();
  const { user } = useAuthContext();

  const handleSearchChange = async (e) => {
    setTitle(e.target.value);
    if (e.target.value.length > 3) {
      const res = await results(e.target.value, user.token, user._id);
      console.log(res);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="title"
          id="default-title"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search a sea"
          onChange={handleSearchChange}
        />
      </div>
    </>
  );
};

export default SearchConversation;
