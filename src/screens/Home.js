import { Chats } from "../components/chat/Chats";
import { SideNav } from "../components/SideNav";
import { Users } from "../components/chat/Users";
import { MainState } from "../services/context/MainContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { Avatar, Divider } from "@mui/material";
import localStorageService from "../services/LocalStorageService";
import { useNavigate } from "react-router-dom";
import { toastError } from "../components/toaster";
import axios, { setAuthToken } from "../services/AxiosService";
import { Media } from "../components/chat/Media";
import socketIo from "socket.io-client";

const ws = socketIo("http://localhost:5500");

const Home = () => {
  useEffect(() => {
    ws.on("connection");

    ws.emit("start-ride", { id: 12345 });
    ws.emit("position-change", { coods: { lat: 1234, long: 5678 } });
    ws.emit("track-ride", { id: 54321, rId: 12345 });
    ws.on("position-change", () => {
      console.log("position changed");
    });
  }, []);

  const navigate = useNavigate();
  const { user, chats, setChats } = MainState();

  const [anchorEl, setAnchorEl] = useState(null);

  const fetchChats = async () => {
    try {
      await setAuthToken(axios);

      const { data } = await axios.get("/chat");

      setChats(data);
    } catch (e) {
      const errorMessage = e?.response?.data?.message || e?.message || e;

      toastError(errorMessage);

      return;
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorageService.remove("user");
    navigate("/login");
  };

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container mx-auto p-2 flex flex-col ">
      <div className="bg-white h-14 flex border-b-2 border-400-100">
        <div className="flex-grow flex justify-center items-center">
          <h2 className="text-2xl font-bold text-teal-900 ">TUK-VLAN</h2>
        </div>
        <div className="flex justify-center items-center text-center min-w-14  ">
          <div className="text-teal-800 flex flex-col">
            <Avatar
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              alt="Remy Sharp"
              src={
                "https://netstorage-tuko.akamaized.net/images/0fgjhs16n71qtsue6.jpg"
              }
              className="cursor-pointer self-center border-2 border-teal-700"
            />
            <span className={"text-sm"}>{user?.name}</span>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              siz
            >
              <MenuItem onClick={() => {}}>My Profile</MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <div
        className="bg-white  flex px-2"
        style={{ height: "96vh", minHeight: "730px" }}
      >
        {/* side Icons Nav */}
        <SideNav />

        {/* chats */}
        {/* <FriendsChat /> */}
        <div className=" flex  flex-grow">
          {/* list of users */}
          <Users
            chats={chats}
            currentUser={user}
            // setFriends={setFriends}
            userOnFocus={() => {}}
            setUserOnFocus={() => {}}
          />
          {/* chat panel */}
          <Chats currentUser={""} userOnFocus={""} />

          <Media />
        </div>
      </div>
    </main>
  );
};

export default Home;
