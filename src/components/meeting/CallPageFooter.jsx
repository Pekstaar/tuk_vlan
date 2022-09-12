import React from "react";
import {
  FaAngleUp,
  FaClosedCaptioning,
  FaDesktop,
  FaMicrophone,
  FaPhone,
  FaVideo,
} from "react-icons/fa";

const CallPageFooter = ({ showMessanger, shareScreen }) => {
  return (
    <div className="flex justify-between shadow-sm bg-white absolute bottom-0 right-0 left-0 h-[90px]">
      <button
        onClick={showMessanger}
        className="flex gap-1 py-5 px-4 hover:bg-gray-200 items-center font-medium "
      >
        Meeting Details
        <FaAngleUp />
      </button>

      {/* icons */}
      <div className="flex gap-4 items-center">
        <button className=" rounded-full flex items-center justify-center w-12 h-12 hover:shadow-lg border-2 border-gray-300">
          <FaMicrophone />
        </button>

        <button className="text-red-600 rounded-full flex items-center justify-center w-12 h-12 hover:shadow-lg border-2 border-gray-300">
          <FaPhone />
        </button>

        <button className="rounded-full flex items-center justify-center w-12 h-12 hover:shadow-lg border-2 border-gray-300">
          <FaVideo />
        </button>
      </div>

      {/* others */}
      <div className="flex gap-5 px-3">
        <button className="px-2 text-gray-700 flex flex-col h-full justify-center hover:bg-gray-200 items-center">
          <FaClosedCaptioning className="text-xl" />

          <p className="text-sm font-medium">Turn on captions</p>
        </button>

        <button
          className="px-2 text-gray-700 flex flex-col h-full justify-center hover:bg-gray-200 items-center"
          onClick={shareScreen}
        >
          <FaDesktop className="text-xl" />

          <p className="text-sm font-medium">present now</p>
        </button>
      </div>
    </div>
  );
};

export default CallPageFooter;
