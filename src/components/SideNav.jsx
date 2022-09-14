import React, { useContext } from "react";
import { Link } from "react-router-dom";
// icons
import { FaVideo } from "react-icons/fa";
import { MdGroup, MdSettingsSuggest } from "react-icons/md";
import { IoLogoWechat, IoShareSocialSharp } from "react-icons/io5";
import { IconButton, Tooltip } from "@mui/material";
import { GiPowerButton } from "react-icons/gi";
import { mainContext } from "../services/context/MainContext";

export const SideNav = () => {
  const { currentNavItem: current, setCurrentNavItem: setCurrent } =
    useContext(mainContext);
  // const navigate = useNavigate();

  const commonStyle = {
    gray500: "text-gray-400",
    textxl: "text-xl ",
    span: "hover:bg-teal-100 hover:text-teal-800 rounded-xl p-3.5 cursor-pointer",
  };

  const handleSpan = (btn) => {
    if (btn === current) {
      return "bg-teal-100 text-teal-800 rounded-xl p-3.5 cursor-pointer";
    } else
      return "hover:bg-teal-100 hover:text-teal-800 rounded-xl p-3.5 cursor-pointer";
  };

  return (
    <div className="flex-shrink-0">
      <div className="sidelist border-gray-200 border-r-2 h-full w-16 p-1 flex flex-col justify-between items-center">
        {/* profile menu */}
        {/* <Link
          as="div"
          to="/"
          className={`h-14 border-gray-200 border-b-2 rounded-t-2xl flex items-center justify-center w-full hover:text-teal-600 cursor-pointer hover:border-teal-600`}
        >
          <FaHome className={`text-2xl text-gray-500  hover:text-teal-600`} />
        </Link> */}
        {/* menu */}
        <div
          className={`menu flex flex-col gap-3 items-center ${commonStyle.gray500}`}
        >
          {/* contact list
          <Link
            to="/chat/contacts"
            as="span"
            className={` ${handleSpan("contacts")}`}
            // onClick={() => setCurrent("contacts")}
          >
            <FaList className={`${commonStyle.textxl}`} />
          </Link> */}

          {/* Friends chat */}
          <Link
            to="/"
            data-tip={"chat"}
            as="span"
            className={` ${handleSpan("friendschat")}`}
            onClick={() => setCurrent("friendschat")}
          >
            <IoLogoWechat className={`${commonStyle.textxl}`} />
          </Link>

          {/* group chat page */}
          <Link
            to="/"
            as="span"
            className={` ${handleSpan("groupschat")}`}
            onClick={() => setCurrent("groupschat")}
          >
            <MdGroup className={`${commonStyle.textxl}`} />
          </Link>

          {/* video Call */}
          <Link
            to="/meet/"
            as="span"
            className={` ${handleSpan("videocall")}`}
            onClick={() => setCurrent("videocall")}
          >
            <FaVideo className={`${commonStyle.textxl}`} />
          </Link>

          {/* video Call */}
          <Link
            to="/social/"
            as="span"
            className={` ${handleSpan("social")}`}
            onClick={() => setCurrent("social")}
          >
            <IoShareSocialSharp className={`${commonStyle.textxl}`} />
          </Link>

          {/* configurations */}
          <Link
            to="/chat/settings"
            as="span"
            className={` ${handleSpan("configs")}`}
            onClick={() => setCurrent("configs")}
          >
            <MdSettingsSuggest className={`text-2xl`} />
          </Link>
        </div>

        {/* logout button */}
        <div className="mb-5 rounded-full p-0.5 bg-teal-700 ">
          <Tooltip title="logout" placement="top">
            <IconButton onClick={() => {}}>
              <GiPowerButton className="text-gray-100" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
