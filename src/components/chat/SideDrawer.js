import { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import axios, { setAuthToken } from "../../services/AxiosService";
import Loader, { ListLoader } from "../Loader";
import { toastError } from "../toaster";
import Avatar from "@mui/material/Avatar";
import GroupModal from "./GroupModal";
// import { Box } from "@chakra-ui/react";
import { MainState } from "../../services/context/MainContext";

const SideDrawer = () => {
  const {
    setSelectedChat,
    chats,
    setChats,
    displayNewGroupModal: showGroupModal,
    setDisplayNewGroupModal: setShowGroupModal,
    displayNewUserModal: isDrawerOpen,
    setDisplayNewUserModal: setIsDrawerOpen,
  } = MainState();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  // const [showGroupModal, setShowGroupModal] = useState(false);

  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    setLoading(true);

    try {
      await setAuthToken(axios);
      const { data } = await axios.get(`/users?search=${searchValue}`);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      const errorMessage = e?.response?.data?.message || e?.message || e;

      toastError(errorMessage);

      setLoading(false);

      return;
    }
  };

  const accessChat = async (id) => {
    setLoadingChat(true);
    try {
      const { data } = await axios.post("/chat", { uid: id });

      if (!chats?.find((c) => c._id === data?._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      setIsDrawerOpen(false);
    } catch (e) {
      const errorMessage = e?.response?.data?.message || e?.message || e;

      toastError(errorMessage);

      setLoadingChat(false);

      return;
    }
  };

  return (
    <>
      <GroupModal
        showGroupModal={showGroupModal}
        setShowGroupModal={setShowGroupModal}
        setSearchValue={setSearch}
        searchValue={search}
        handleSearch={handleSearch}
        searchResult={searchResult}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <main
        className={
          " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
          (isDrawerOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0  "
            : " transition-all delay-500 opacity-0 translate-x-full  ")
        }
      >
        <section
          className={
            " w-96 right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
            (isDrawerOpen ? " translate-x-0 " : " translate-x-full ")
          }
        >
          <article className="relative  max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
            <button
              onClick={() => setShowGroupModal(true)}
              className="bg-teal-600 text-white font-bold text-md p-2 w-11/12 mx-auto rounded-lg mt-2 h-12"
            >
              Create Group
            </button>

            <div className="h-14 p-3 border-b-2 border-gray-400 font-semibold text-lg text-teal-900">
              Search user
            </div>

            <div className="search p-1 relative">
              {/* input */}
              <input
                type="text"
                placeholder="search"
                className="w-full bg-indigo-50 text-sm p-2 px-2.5 outline-none text-gray-500 rounded-3xl"
                value={search}
                onChange={handleSearch}
              />

              {/* absolute search icon */}
              <MdOutlineSearch className="text-2xl absolute right-3 top-3 text-gray-500" />
            </div>
            {loadingChat && <Loader />}

            <div className="px-3 flex flex-col gap-2">
              {loading ? (
                <ListLoader />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user?._id}
                    user={user}
                    handleFunction={() => accessChat(user?._id)}
                  />
                ))
              )}
            </div>
            {/* {children} */}
          </article>
        </section>
        <section
          className=" w-screen h-full cursor-pointer "
          onClick={() => {
            setIsDrawerOpen(false);
          }}
        ></section>
      </main>
    </>
  );
};

export default SideDrawer;

export const UserListItem = ({ handleFunction, user }) => {
  return (
    <div
      className="flex p-2 rounded-xl bg-indigo-50 gap-1 cursor-pointer items-center hover:bg-teal-700 hover:text-white text-gray-900"
      onClick={handleFunction}
    >
      <Avatar />
      <div className="flex flex-col">
        <span className="text-md font-medium">{user?.name}</span>
        <span className="text-sm"> {user?.email}</span>
      </div>
    </div>
  );
};
