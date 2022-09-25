import React from "react";

const FriendItem = ({ image, desc, name, time }) => {
  return (
    <div className="p-2 flex gap-2">
      {/* {JSON.stringify(name)} */}
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

      <div className="text-xs font-medium text-gray-600">
        <div>
          <span className={"font-semibold text-black text-sm"}>{name}</span>
        </div>

        <div className="text-xs text-gray-400 font-medium">
          Active {"5 mins"} ago
        </div>
      </div>
    </div>
  );
};

export default FriendItem;
