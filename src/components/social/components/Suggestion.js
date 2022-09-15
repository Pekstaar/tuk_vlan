import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";

const Suggestion = ({ image, name }) => {
  return (
    <div className="px-2 py-1 flex gap-2">
      <div className="h-10 w-10 rounded-full overflow-hidden">
        <img
          className="object-cover h-full w-full"
          src={image}
          alt="activity"
        />
      </div>

      <div className="text-xs font-medium text-gray-600 flex-1">
        <div>
          <span className={"font-semibold text-black text-sm"}>{name}</span>{" "}
        </div>

        <div className="text-xs text-gray-400 font-medium ">
          followed by 4 of your friends
        </div>
      </div>

      <button className="h-8 w-8 flex justify-center items-center bg-green-100 rounded-full">
        <AiOutlineUserAdd className="text-teal-800" />
      </button>
    </div>
  );
};

export default Suggestion;
