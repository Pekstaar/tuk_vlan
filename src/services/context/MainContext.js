import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import localStorageService from "../LocalStorageService";

export const mainContext = createContext();

const MainContext = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorageService.fetch("user"));
  const [currentNavItem, setCurrentNavItem] = useState("friendschat");
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState({});
  const [chats, setChats] = useState([]);
  const [showMedia, setShowMedia] = useState(false);

  const [displayNewUserModal, setDisplayNewUserModal] = useState(false);
  const [displayNewGroupModal, setDisplayNewGroupModal] = useState(false);
  const [currentGroupDetails, setCurrentGroupDetails] = useState(null);

  const [meetingId, setMeetingId] = useState("");

  // load user from local storage:
  // console.log("USER:", user);

  useEffect(() => {
    const userDetails = JSON.parse(localStorageService.fetch("user"));
    // setLoading(true);
    // fetchUserFromLocal();

    // if (!userDetails?.token) {
    //   navigate("/login");
    //   setLoading(false);
    // } else {
    setUser(userDetails);
    setLoading(false);
    // }
  }, [navigate]);

  if (loading) return <Loading />;

  return (
    <mainContext.Provider
      value={{
        user,
        setUser,
        currentNavItem,
        setCurrentNavItem,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        setShowMedia,
        showMedia,
        displayNewGroupModal,
        setDisplayNewGroupModal,
        displayNewUserModal,
        setDisplayNewUserModal,
        currentGroupDetails,
        setCurrentGroupDetails,
        meetingId,
        setMeetingId,
      }}
    >
      {children}
    </mainContext.Provider>
  );
};

export const MainState = () => {
  return useContext(mainContext);
};

export default MainContext;
