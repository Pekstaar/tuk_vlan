import React from "react";

const ActionButton = ({ isCurrent, children }) => {
  return (
    <button
      className={`h-10 w-10 flex items-center rounded-full justify-center border-2 hover:scale-[0.95] ${
        isCurrent
          ? "bg-teal-50 text-teal-600 border-teal-400"
          : "bg-slate-100 text-slate-600 border-slate-400"
      } `}
    >
      {children}
    </button>
  );
};

export default ActionButton;
