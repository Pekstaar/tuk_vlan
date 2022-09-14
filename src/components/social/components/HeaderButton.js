import React from "react";

const HeaderButton = ({ children }) => {
  return (
    <div className="bg-gray-200 rounded-full h-10 w-10 flex overflow-hidden cursor-pointer hover:scale-[0.9]">
      {children}
    </div>
  );
};

export default HeaderButton;
