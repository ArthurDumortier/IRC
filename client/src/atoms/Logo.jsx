import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <img
        src="/dolphin.svg"
        alt="Dolphin Logo"
        className="w-24 h-24 rounded-full bg-slate-400 m-2 hover:opacity-80 transition duration-200 cursor-pointer"
      />
    </div>
  );
};

export default Logo;
