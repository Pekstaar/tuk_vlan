import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { MainState } from "../../services/context/MainContext";
import UpdateGroup from "./UpdateGroupModal";
import { toastError, toastSuccess } from "../toaster";
import axios, { setAuthToken } from "../../services/AxiosService";

export const Media = ({ userOnFocus }) => {
  const { user, selectedChat, showMedia, setCurrentGroupDetails, setChats } =
    MainState();

  const [showGroupModal, setShowGroupModal] = useState(false);
  const [users, setUsers] = useState(selectedChat?.users);

  useEffect(() => {
    setUsers(selectedChat?.users);
  }, [selectedChat]);

  const currentUser = !selectedChat?.isGroupChat
    ? selectedChat?.users?.filter((u) => u?._id !== user?._id)[0]
    : selectedChat;

  const names = !selectedChat?.isGroupChat
    ? currentUser?.name?.split(" ")
    : currentUser?.chatName?.split("");

  const handleUpdate = () => {
    setShowGroupModal(true);
    setCurrentGroupDetails(currentUser);
  };

  const handleRemoveUser = async (u) => {
    const confirmation = window.confirm(
      "Are you sure you want to remove " + u?.name + " from group?"
    );

    if (confirmation.valueOf("ok")) {
      if (!selectedChat?.groupAdmin?._id === user?._id) {
        toastError("Unauthorized!! only group administrators are allowed!");
      }

      try {
        await setAuthToken(axios);

        await axios.put(`/chat/group_remove`, {
          chat_id: selectedChat?._id,
          uid: u?._id,
        });

        const { data } = await axios.get("/chat");

        setChats(data);
        const filteredUsers = users.filter((item) => item._id !== u?._id);
        setUsers(filteredUsers);

        toastSuccess(user?.name + " removed successfully!");
        // setLoading(false);
      } catch (error) {
        toastError(error?.message);
        // setLoading(false);
      }
    }
    return;
  };

  return (
    <>
      <UpdateGroup
        showGroupModal={showGroupModal}
        setShowGroupModal={setShowGroupModal}
        groupDetails={selectedChat}
        user={user}
        setChats={setChats}
      />
      <div
        className={`${
          !showMedia && "hidden"
        } media w-72 flex-shrink-0 border-gray-200 border-l-2 `}
      >
        {/* header */}
        {/* title */}
        <div className="h-14 flex items-center justify-center slab text-xl text-gray-500 border-gray-200 border-b-2 mx-2 lowercase">
          Media
        </div>

        {/* details card */}
        {/* card rounded image */}
        {userOnFocus && <Card currentChat={userOnFocus} />}

        {/* files */}
        {/* file icons */}
        <div className="h-44 bg-indigo-50 m-2 flex items-center justify-center flex-col ">
          {/* image div */}
          <div className="img w-20 h-20 flex items-center justify-center bg-green-200 rounded-full border-2 border-white relative">
            {/* image/ */}
            {currentUser &&
            currentUser.pic &&
            currentUser.imageUrl !== "" &&
            currentUser.imageUrl !== null ? (
              <img
                src={currentUser && currentUser.imageUrl}
                alt=""
                className="h-full rounded-full w-full object-cover"
              />
            ) : (
              <span className="font-medium slab text-3xl text-green-800">
                {names && names[0].substring(0, 1)}
                {names && names[1]?.substring(0, 1)}
              </span>
            )}

            {/* status dot */}
            {!currentUser?.isGroupChat && (
              <div
                className={
                  currentUser &&
                  currentUser.status &&
                  currentUser.status === "online"
                    ? "dot rounded-full bg-green-500 w-4 h-4 border-gray-100 border-4 p-1.5 absolute bottom-0 right-0"
                    : `dot rounded-full bg-gray-400 w-4 h-4 border-gray-100 border-4 p-1.5 absolute bottom-0 right-0`
                }
              ></div>
            )}
          </div>
          {/* user name */}
          <span className="font-medium text-base slab  text-gray-500 ">
            {currentUser?.name || currentUser?.chatName}
          </span>

          {/* status */}
          {!currentUser?.isGroupChat ? (
            <>
              {currentUser?.status === "online" ? (
                <div className="status bg-green-300 rounded text-sm text-green-800 p-1">
                  online
                </div>
              ) : (
                <div className="status bg-gray-300 rounded text-sm text-gray-500 p-1">
                  offline
                </div>
              )}
            </>
          ) : (
            <>
              <span className="text-xs font-medium">
                {users?.length} Members
              </span>

              {currentUser?.groupAdmin?._id === user?._id && (
                <div className="flex gap-2 justify-center text-xs font-medium uppercase mt-1">
                  <Tooltip title="Add new user">
                    <button
                      onClick={handleUpdate}
                      className="p-1 bg-teal-600 text-gray-100 rounded-lg hover:bg-teal-700 font-medium min-w-[60px]"
                    >
                      Add
                    </button>
                  </Tooltip>

                  <Tooltip title="Rename Group">
                    <button
                      onClick={handleUpdate}
                      className="p-1 bg-teal-600 text-gray-100 rounded-lg hover:bg-teal-700 font-medium min-w-[60px]"
                    >
                      Rename
                    </button>
                  </Tooltip>
                </div>
              )}
            </>
          )}
        </div>
        {/* <div className="file-icons flex justify-around p-2 mt-3">
        <FileCard bg={"bg-green-100"} text="All Files" number={230}>
          <BsFolderFill className={`text-2xl text-green-800`} />
        </FileCard>
        <FileCard bg={"bg-indigo-50"} text="All Links" number={120}>
          <div className={`p-2 bg-indigo-400 rounded-full`}>
            <HiOutlineLink className={`text-xl text-gray-100`} />
          </div>
        </FileCard>
      </div> */}

        {/* items */}
        <div className=" shared_items flex-grow">
          {/* header */}
          <div className="shared_items_header p-2 flex justify-between">
            {/* title */}
            <span className="text-gray-500">GroupMembers</span>

            {/* verticaldots */}
            <HiDotsVertical className="text-xl text-gray-400 cursor-pointer" />
          </div>
          {/* list of items */}
          {selectedChat?.isGroupChat && (
            <div
              className="mediaList overflow-y-scroll flex flex-col"
              style={{ maxHeight: "375px" }}
            >
              {users?.map((cUser) => {
                return (
                  <ListedItem
                    groupUser={cUser}
                    currentUser={currentUser}
                    user={user}
                    handleRemoveUser={() => handleRemoveUser(cUser)}
                  ></ListedItem>
                );
              })}
              {/* first */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Card = ({ currentChat }) => (
  <div className="m-2 flex items-center justify-center flex-col gap-1 ">
    {/* user name */}
    <span className="font-medium text-base text-gray-700 mt-2">
      {currentChat && currentChat.name}
    </span>
    {/* image div */}
    <div className="img w-20 h-20 rounded-full border-2 border-gray-300 relative">
      {/* image/ */}
      <img
        src={currentChat && currentChat.imageUrl}
        alt=""
        className="h-full rounded-full w-full object-cover"
      />
      {/* status dot */}
      <div
        className={
          currentChat && currentChat.status === "online"
            ? "dot rounded-full bg-green-500 w-4 h-4 border-gray-100 border-4 p-1.5 absolute bottom-0 right-0"
            : `dot rounded-full bg-gray-400 w-4 h-4 border-gray-100 border-4 p-1.5 absolute bottom-0 right-0`
        }
      ></div>
    </div>

    {/* email */}
    <span className="font-light text-sm text-center">
      {currentChat && currentChat.email}
    </span>
    {/* description */}
    <span className="font-light text-sm text-center">
      {currentChat && currentChat.about}
    </span>
  </div>
);

const FileCard = ({ bg, children, text, number }) => (
  <div
    className={`div ${bg} w-28 h-20 rounded-xl flex items-center gap-1 justify-center`}
  >
    {children}
    <div className="ml-1 text-gray-600">
      <span className="text-xs font block">{text}</span>
      <span className="text-xl  font-medium block">{number}</span>
    </div>
  </div>
);

// const ListedItem = ({ name, details, background, children }) => (
//   <div
//     className={`item flex items-center hover:bg-${background}-100 cursor-pointer text-gray-600  py-2.5`}
//   >
//     {/* icon */}
//     <div
//       className={`icon flex items-center justify-center rounded-xl bg-${background}-100 w-12 h-12 mx-1`}
//     >
//       {children}
//     </div>

//     {/* details */}
//     <div className="flex-grow flex flex-col justify-center pr-1">
//       <span className="text-sm font-medium">{name}</span>
//       <span className="text-xs text-gray-500">{details}</span>
//     </div>

//     {/* icon */}
//     <div className="icon mr-2">
//       <BiChevronDown className="text-2xl text-gray-500" />
//     </div>
//   </div>
// );

const ListedItem = ({ groupUser, user, currentUser, handleRemoveUser }) => (
  <div
    className={`user m-1 p-2 flex items-center gap-2 rounded-md cursor-pointer bg-indigo-50  `}
  >
    {/* image */}
    <div className="img w-10 h-10 rounded-full border-2 flex-shrink-0 border-gray-300 relative flex items-center justify-center bg-green-200 ">
      {/* image/ */}

      {groupUser?.pic ? (
        <img
          src={groupUser.pic}
          alt=""
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span className="font-medium slab text-xl text-green-800">
          {groupUser?.name?.substring(0, 1)}
        </span>
      )}
    </div>

    {/* details */}
    <div className="details flex-grow justify-center gap-1 font-medium h-12 flex flex-col hover:text-white">
      <span className="text-sm text-gray-800">{groupUser?.name}</span>
      <span className="text-[13px] text-gray-600 font-normal">
        {groupUser?.registration}
      </span>
    </div>

    <div>
      {currentUser?.groupAdmin?._id === user?._id && (
        <Tooltip title="remove user ">
          <button
            className="bg-red-600 rounded-full p-1 mr-1 text-white"
            onClick={handleRemoveUser}
          >
            <MdDelete />
          </button>
        </Tooltip>
      )}
    </div>
  </div>
);
