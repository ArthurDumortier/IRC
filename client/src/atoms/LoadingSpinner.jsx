const LoadingSpinner = () => {
	return (
		<div className="fixed inset-0 bg-gray-200 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50 flex justify-center items-center">
			<div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
		</div>
	);
};

export default LoadingSpinner;
