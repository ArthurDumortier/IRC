import Sidebar from "../organisms/Sidebar";

const Global = ({ children }) => {
	return (
		<div className="min-h-dvh dark:bg-slate-800 bg-slate-100 w-full flex">
			<Sidebar />
			{children}
		</div>
	);
};

export default Global;
