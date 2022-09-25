import React from "react";

const HeaderButton = ({ children, className }) => {
  return (
    <div
      className={`bg-gray-200 rounded-full h-10 w-10 flex overflow-hidden cursor-pointer hover:scale-[0.9] ${className}`}
    >
      {children}
    </div>
  );
};

export default HeaderButton;
