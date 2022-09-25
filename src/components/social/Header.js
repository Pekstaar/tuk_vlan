import React from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { MainState } from "../../services/context/MainContext";
import HeaderButton from "./components/HeaderButton";
import Search from "./components/Search";

const Header = () => {
  const { user } = MainState();
  return (
    <div className="bg-white p-2 h-14 w-full flex justify-between items-center">
      {/* logo */}
      <div className="text-lg text-center flex-1 font-bold text-teal-700">
        TUK-SHARE
      </div>
      {/* search */}
      <div className="flex-[2]">
        <Search />
      </div>
      {/* icons */}
      <div className="flex-1 flex gap-3">
        <HeaderButton>
          <AiOutlinePlusSquare fontSize={"xl"} className={"m-auto"} />
        </HeaderButton>
        <HeaderButton>
          <FaBell fontSize={"xl"} className={"m-auto"} />
        </HeaderButton>
        <HeaderButton className={"bg-teal-500 text-white font-bold flex items"}>
          {/* <img
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="profile"
            className="h-full w-full object-cover object-top"
          /> */}
          <span className="m-auto text-lg">{user?.name?.slice(0, 1)}</span>
        </HeaderButton>
      </div>
    </div>
  );
};

export default Header;
