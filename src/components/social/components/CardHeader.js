import React from "react";

const CardHeader = ({ title }) => {
  return (
    <div className="flex justify-between items-center px-4 pb-1">
      <span className="font-bold ">{title}</span>
      <button className="font-semibold text-teal-600 hover:bg-green-100 p-1 rounded-lg ">
        See all
      </button>
    </div>
  );
};

export default CardHeader;
