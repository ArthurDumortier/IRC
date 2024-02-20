const DateDisplay = ({ date }) => {
	const displayDate = date ? new Date(date) : new Date();
	const formattedDate = displayDate.toLocaleDateString("fr-FR", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
			<div>
				<p className="text-gray-500">{formattedDate}</p>
			</div>
		</div>
	);
};

export default DateDisplay;
