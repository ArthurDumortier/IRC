import { useState } from "react";
import Avatar from "../atoms/Avatar";
import MessageMenu from "../atoms/MessageMenu";
import { useMessages } from "../hooks/useMessages";

const MessageBubble = ({ message, onDeleteSuccess }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { deleteMessage } = useMessages(); // Use the useMessages hook

	const handleDelete = async () => {
		const success = await deleteMessage(message._id);
		if (success) {
			onDeleteSuccess(message._id);
		}
	};

	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

	return (
		<div className="flex items-start gap-2.5 mb-2">
			<Avatar profilPic={message.sender?.profilPic ?? null} />
			<div className="flex flex-col w-full max-w-[320px] md:max-w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700">
				<div className="flex justify-between items-center w-full">
					<div className="flex items-center space-x-2">
						<span className="text-sm font-semibold text-gray-900 dark:text-white">
							{message.sender?.username ?? "Anonymous"}
						</span>
						<span className="text-xs font-normal text-gray-500 dark:text-gray-400">
							{new Date(message.createdAt).toLocaleDateString()} at{" "}
							{new Date(message.createdAt).toLocaleTimeString()}
						</span>
					</div>
					<MessageMenu
						isOpen={isDropdownOpen}
						toggleDropdown={toggleDropdown}
						onDelete={handleDelete} // Pass the handleDelete function
					/>
				</div>
				<p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
					{message.content}
				</p>
				<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
					Delivered
				</span>
			</div>
		</div>
	);
};

export default MessageBubble;
