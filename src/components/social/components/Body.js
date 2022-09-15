import React from "react";

const Body = ({ children }) => {
  return (
    <div className="container flex flex-1 gap-6 max-h-[90vh]  ">{children}</div>
  );
};

export default Body;
