import React from "react";

const Wrapper = ({ className, children }) => {
  return (
    <div className={`rounded-2xl bg-white p-2 ${className}`}>{children}</div>
  );
};

export default Wrapper;
