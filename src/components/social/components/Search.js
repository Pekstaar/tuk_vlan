import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ handleChange }) => {
  return (
    <div className="w-3/4 mx-auto bg-gray-200 rounded-full flex flex-1 overflow-hidden">
      {/* input */}
      <input
        type="text"
        onChange={handleChange}
        className={"py-1.5 px-5 bg-inherit flex-1 focus:outline-none"}
        placeholder={"search"}
      />
      {/* search icon */}
      <div className="px-5 flex">
        <FaSearch className="text-md text-gray-500 m-auto" />
      </div>
    </div>
  );
};

export default Search;
