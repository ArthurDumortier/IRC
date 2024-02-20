import ChannelList from "../molecules/ChannelList";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import ConversationMenu from "../atoms/ConversationMenu";
import { useAuthContext } from "../hooks/useAuthContext";
import ChannelProfil from "../molecules/ChannelProfil";
import SearchConversation from "../atoms/SearchConversation";

const Chats = ({ socket }) => {
  let { channels } = ChannelList();

  const [selectedChannel, setSelectedChannel] = useState(null);

  const truncateDescription = (description) => {
    if (description.length > 30) {
      return description.substring(0, 30) + "...";
    } else {
      return description;
    }
  };

  return (
    <>
      <div className="container flex h-screen">
        {/* Conversations */}
        <div className="conversations w-1/4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 overflow-y-auto dark:border-r-4 dark:border-gray-700">
          <SearchConversation />

          <ul>
            {(channels &&
              channels.map((channel) => (
                <li
                  key={channel._id}
                  className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 ${
                    selectedChannel === channel ? "dark:bg-gray-700" : ""
                  }`}
                >
                  <Link
                    onClick={(e) => setSelectedChannel(channel)}
                    to={channel._id}
                    className="flex items-center w-full"
                  >
                    <div className="w-1/4">
                      <img
                        src={channel.picture}
                        alt="User Avatar"
                        className="object-cover h-12 w-12 rounded-full"
                        onError={(e) =>
                          (e.target.src = `https://api.dicebear.com/7.x/shapes/svg?seed=default`)
                        }
                      />
                    </div>
                    <div className="w-full ml-4">
                      <div className="text-lg font-semibold">
                        {channel.title}
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">
                        {truncateDescription(channel.description)}
                      </span>
                    </div>
                  </Link>
                  <ConversationMenuWrapper theChannel={channel} />
                </li>
              ))) || <div>Loading...</div>}
          </ul>
        </div>

        {/* Messages */}
        {selectedChannel && (
          <div className="messages flex-1 bg-gray-200 dark:bg-gray-900">
            <Outlet />
          </div>
        )}
      </div>
      {selectedChannel && (
        <div className="w-2/6 border-l-2 px-5 h-full dark:text-gray-100">
          <ChannelProfil channel={selectedChannel} />
        </div>
      )}
    </>
  );
};

const ConversationMenuWrapper = ({ theChannel }) => {
  const { user } = useAuthContext();
  const channel = theChannel;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <ConversationMenu
      theChannel={channel}
      isOpen={isDropdownOpen}
      toggleDropdown={toggleDropdown}
      user={user}
    />
  );
};

export default Chats;
