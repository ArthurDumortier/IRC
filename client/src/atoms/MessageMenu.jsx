const MessageMenu = ({ isOpen, toggleDropdown, onDelete }) => {
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
				<div className="py-1">
					<button
						className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
						onClick={() => onDelete()}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default MessageMenu;
