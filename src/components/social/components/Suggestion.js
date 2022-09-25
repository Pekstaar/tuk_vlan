import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";

const Suggestion = ({ image, name, handleAddFriend }) => {
  return (
    <div className="px-2 py-1 flex gap-2">
      <div className="h-10 w-10 rounded-full overflow-hidden flex bg-teal-500 text-white font-bold">
        {image && (
          <img
            className="object-cover h-full w-full"
            src={image}
            alt="activity"
          />
        )}

        {<span className="m-auto text-lg">{name?.slice(0, 1)}</span>}
      </div>

      <div className="text-xs font-medium text-gray-600 flex-1">
        <div>
          <span className={"font-semibold text-black text-sm"}>{name}</span>{" "}
        </div>

        <div className="text-xs text-gray-400 font-medium ">
          click to add friend
        </div>
      </div>

      <button
        onClick={handleAddFriend}
        className="h-8 w-8 flex justify-center items-center bg-green-100 rounded-full"
      >
        <AiOutlineUserAdd className="text-teal-800" />
      </button>
    </div>
  );
};

export default Suggestion;
