import React from "react";
import { MdOutlineClose } from "react-icons/md";

const UserBadge = ({ user, handleDelete }) => {
  return (
    <div className="text-sm bg-teal-600 py-2 px-3 rounded-lg text-white flex items-center gap-1 justify-between">
      <span>{user?.name}</span>
      <button className="text-base p-0 mt-1" onClick={handleDelete}>
        <MdOutlineClose />
      </button>
    </div>
  );
};

export default UserBadge;
