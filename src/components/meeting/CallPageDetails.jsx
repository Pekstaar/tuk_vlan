import React from "react";
import { FaCopy, FaShieldAlt, FaTimes, FaUser } from "react-icons/fa";

const CallPageDetails = ({ isOpen, onClose, url }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div
      className={`absolute top-5 left-4 bg-gray-50 py-5 px-5 rounded-lg w-[340px] flex flex-col gap-2.5 ${
        !isOpen && "hidden"
      }`}
    >
      <div className="flex justify-between items-center text-lg">
        <span className="font-medium">Your meeting's ready</span>

        <button
          onClick={onClose}
          className="rounded-full p-2 hover:bg-gray-200"
        >
          <FaTimes className="" />
        </button>
      </div>

      <button className="p-2.5 w-[115px] flex text-sm font-medium text-white items-center gap-2 bg-teal-600 rounded ">
        <FaUser /> Add Others
      </button>

      <p className="font-medium text-sm text-gray-600">
        Or share meeting via link with others you want in the meeting
      </p>

      <div className="p-3 text-sm bg-gray-200 text-gray-700 rounded-xl gap-2 flex justify-between items-center font-medium">
        {url}

        <button
          onClick={handleCopy}
          className="text-gray-600 hover:text-teal-700 w-[80px] text-center rounded-lg font-medium"
        >
          <FaCopy className="text-lg" />
        </button>
      </div>

      <div className="flex gap-2 items-center">
        <FaShieldAlt className="text-blue-500 text-2xl" />
        <p className="text-xs text-gray-500 font-medium">
          People who use this meeting link must get your permission before
          joining
        </p>
      </div>

      <div className="text-center my-1 text-sm font-medium text-gray-600">
        joining as ericpekmah@students.tukenya.ac.ke
      </div>
    </div>
  );
};

export default CallPageDetails;
