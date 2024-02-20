import { useState, useRef } from "react";
import { Link } from "react-router-dom";
const NavTree = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const retractTimeout = useRef(null);

	const handleMouseEnter = () => {
		clearTimeout(retractTimeout.current);
		setIsExpanded(true);
	};

	const handleMouseLeave = () => {
		retractTimeout.current = setTimeout(() => {
			setIsExpanded(false);
		}, 1000); // Delay before retracting the expanded menu
	};

	return (
		<div className="p-5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
			<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				<span className="cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition duration-200">
					<h2 className="text-xl font-semibold mb-4">Navigation</h2>
				</span>
				<ul className="space-y-3 mt-2">
					<li>
						<Link
							to="/chats"
							className="block hover:text-blue-500 dark:hover:text-blue-400 transition duration-200"
						>
							Chats
						</Link>
					</li>
					{!isExpanded && (
						<li>
							<span>...</span>
						</li>
					)}
					{isExpanded && (
						<>
							<li>
								<Link
									to="/"
									className="block hover:text-blue-500 dark:hover:text-blue-400 transition duration-200"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/chats"
									className="block hover:text-blue-500 dark:hover:text-blue-400 transition duration-200"
								>
									Help
								</Link>
							</li>
							<li>
								<Link
									to="/chats"
									className="block hover:text-blue-500 dark:hover:text-blue-400 transition duration-200"
								>
									About
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</div>
	);
};

export default NavTree;
