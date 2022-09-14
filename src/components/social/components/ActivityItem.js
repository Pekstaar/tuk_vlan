import React from "react";

const ActivityItem = ({ image, desc, user, time }) => {
  return (
    <div className="p-2 flex gap-2">
      <div className="h-10 w-10 rounded-full overflow-hidden">
        <img className="object-cover" src={image} alt="activity" />
      </div>

      <div className="text-xs font-medium text-gray-600">
        <div>
          <span className={"font-semibold text-black text-sm"}>{user}</span>{" "}
          {desc}
        </div>

        <div className="text-xs text-gray-400 font-medium">{time} min ago</div>
      </div>
    </div>
  );
};

export default ActivityItem;
