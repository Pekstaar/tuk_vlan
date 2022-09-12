import React from "react";
import logo from "../../assets/images/google-meet-logo.png";
import { MdHelpOutline, MdFeedback } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

const Header = () => {
  return (
    <div className="flex justify-between px-5 py-2 bg-white">
      {/* logo */}
      <div className="flex gap-2">
        <img src={logo} alt="logo" className="h-8" />

        <span className="text-gray-600 font-bold text-lg">
          TUK-<span className="text-teal-600">MEET</span>
        </span>
      </div>

      {/* actions */}
      <div className="flex gap-5 text-gray-700 items-center text-2xl ">
        <FiSettings />

        <MdFeedback />

        <MdHelpOutline />
      </div>
    </div>
  );
};

export default Header;
