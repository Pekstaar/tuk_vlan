import React from "react";
import { FaPaperPlane, FaTimes, FaUsers } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";

const CallMessanger = ({ isOpen = true, hideMessanger }) => {
  return (
    <div
      className={`${
        !isOpen && "hidden"
      } w-[340px] flex flex-col absolute right-0 top-0 h-[88.2%] bg-gray-100`}
    >
      {/* header */}
      <div className="flex justify-between p-3 bg-slate-50">
        <span className="font-semibold text-gray-700">Meeting Details</span>

        <button
          onClick={hideMessanger}
          className="rounded-full p-2 hover:bg-gray-200"
        >
          <FaTimes className="" />
        </button>
      </div>

      {/* tabs */}
      <div className="flex">
        <button className="p-3 hover:bg-gray-200 flex gap-2 border-b-2 border-gray-300 text-gray-600 flex-1 items-center justify-center">
          <FaUsers className="text-xl" /> <span>People (1)</span>
        </button>

        <button className="p-3 hover:bg-gray-200 text-teal-600 flex gap-2 border-b-2 border-teal-600 flex-1 items-center justify-center">
          <MdFeedback className="text-xl" /> <span>Chat</span>
        </button>
      </div>

      {/* body */}
      <div className=" w-full h-[100%] flex flex-col relative">
        {/* chat item */}
        <Chat />

        <ChatInput />
      </div>
    </div>
  );
};

export default CallMessanger;

const Chat = () => (
  <div className={`p-3 flex flex-col `}>
    <div className="flex gap-2 text-sm">
      <span className="font-semibold">You</span>
      <span className="text-gray-500 font-medium text-[13px]">10:00PM</span>
    </div>
    <div className="text-gray-600 text-sm">Here is my message.</div>
  </div>
);

const ChatInput = () => (
  <div className="border-0 bg-white p-1 absolute bottom-0 right-0 left-0">
    <div className="border-2 border-gray-300 flex items-center ">
      <input
        type="text"
        placeholder="Send message to everyone"
        className=" text-gray-500 p-3 flex-grow focus:outline-none"
      />

      <button className=" w-8 flex">
        <FaPaperPlane className="text-gray-700 text-xl mx-auto" />
      </button>
    </div>
  </div>
);
