import React from "react";
import { FaCommentAlt, FaUserCircle, FaUserFriends } from "react-icons/fa";

const CallPageHeader = ({ toggleMessanger }) => {
  return (
    <div className="text-2xl overflow-hidden text-gray-600 flex items-center justify-center rounded-bl-xl absolute top-0 right-0 gap-1 w-[240px] bg-white">
      <button className="w-full hover:bg-gray-200 p-3.5 flex justify-center">
        <FaUserFriends />
      </button>

      <button
        onClick={toggleMessanger}
        className=" w-full hover:bg-gray-200 p-3.5 flex justify-center"
      >
        <div className="relative">
          <FaCommentAlt />

          <div className="h-4 w-4 bg-teal-600 border-[3px] border-white rounded-full absolute -right-1 -top-1" />
        </div>
      </button>

      <button className="w-full hover:bg-gray-200 p-3.5 flex justify-center">
        <FaUserCircle />
      </button>
    </div>
  );
};

export default CallPageHeader;
