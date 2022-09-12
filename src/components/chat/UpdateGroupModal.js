import React, { useEffect, useState } from "react";
import axios, { setAuthToken } from "../../services/AxiosService";
import { toastError, toastSuccess, toastWarning } from "../toaster";
import Loader from "../Loader";
import { UserListItem } from "./SideDrawer";
import UserBadge from "../usersList/UserBadge";
import { MainState } from "../../services/context/MainContext";

const UpdateGroup = ({
  showGroupModal,
  setShowGroupModal,
  groupDetails: details,
  user,
}) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedUser, setSelectedUser] = useState({});

  const { chats, setChats } = MainState();

  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    setLoading(true);

    try {
      await setAuthToken(axios);
      const { data } = await axios.get(`/users?search=${searchValue}`);

      setLoading(false);
      setSearchResult(data);
    } catch (e) {
      const errorMessage = e?.response?.data?.message || e?.message || e;

      toastError(errorMessage);

      setLoading(false);

      return;
    }
  };

  useEffect(() => {
    if (details?._id) {
      const currentChat = chats.filter((item) => item._id === details._id)[0];
      setGroupName(currentChat?.chatName);
      setAddedUsers(currentChat?.users);
    }
  }, [details, chats]);

  const handleRename = async () => {
    setLoading(true);

    try {
      await axios.put(`/chat/rename`, {
        chat_name: groupName,
        chat_id: details?._id,
      });

      await setAuthToken(axios);

      const { data } = await axios.get("/chat");

      setChats(data);

      toastSuccess(groupName + " Renamed successfully!");
      setLoading(false);
    } catch (e) {
      const errorMessage = e?.response?.data?.message || e?.message || e;

      toastError(errorMessage);

      setLoading(false);

      return;
    }
  };
  const handleAddUser = async (newUser) => {
    setLoading(true);
    if (!details?.groupAdmin?._id === user?._id) {
      toastError("Unauthorized only admins are allowed!");
      return;
    }

    if (details?.users.find((u) => u._id === newUser?._id)) {
      toastError("User already exists in group");
      return;
    }

    try {
      await setAuthToken(axios);

      await axios.put(`/chat/group_add`, {
        chat_id: details?._id,
        uid: newUser?._id,
      });

      const { data } = await axios.get("/chat");

      console.log(data);

      toastSuccess(newUser?.name + " added successfully!");
      setLoading(false);
    } catch (error) {
      toastError(error?.message);
      setLoading(false);
    }
  };
  const handleRemoveUser = async (user) => {
    try {
      await setAuthToken(axios);

      await axios.put(`/chat/group_remove`, {
        chat_id: details?._id,
        uid: user?._id,
      });

      const { data } = await axios.get("/chat");

      setChats(data);

      toastSuccess(user?.name + " exited successfully!");
      setLoading(false);
    } catch (error) {
      toastError(error?.message);
      setLoading(false);
    }
  };

  const handleGroup = (user) => {
    setSelectedUser(user);

    if (addedUsers?.includes(user)) {
      toastWarning("User already exists!");
      return;
    }
    setAddedUsers((prev) => [user, ...prev]);
  };

  //   console.log(groupDetails);

  return (
    // <!-- Main modal -->
    <div
      className={`${
        showGroupModal ? "" : "hidden"
      } bg-[#00000060]  flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}
    >
      <div className="relative p-4 w-2/5 h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={() => setShowGroupModal(false)}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="py-6 px-6 lg:px-8 flex flex-col">
            <h3 className="mb-4 text-xl text-center font-medium text-gray-900 dark:text-white">
              {groupName}
            </h3>
            <div className="flex flex-col gap-3 py-2">
              <div className="flex gap-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="new group name"
                  required
                />

                {details?.groupAdmin?._id === user?._id && (
                  <button
                    type="submit"
                    onClick={handleRename}
                    className="p-2 bg-teal-700 rounded-lg text-white"
                  >
                    Rename
                  </button>
                )}
              </div>
              {/* <form className="space-y-6" action="#"> */}
              {details?.groupAdmin?._id === user?._id && (
                <input
                  type="text"
                  name="name"
                  id="name"
                  // value={selectedUser?.name}
                  onChange={handleSearch}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Add Users e.g John Doe"
                  required
                />
              )}
            </div>

            {details?.groupAdmin?._id === user?._id && (
              <div className="flex flex-wrap gap-2">
                {addedUsers.map((u) => (
                  <UserBadge
                    key={u?.id}
                    user={u}
                    handleDelete={() =>
                      setAddedUsers(
                        addedUsers.filter((item) => item?._id !== u?._id)
                      )
                    }
                  />
                ))}
              </div>
            )}
            <div className="p-3 ">
              {loading ? (
                <Loader />
              ) : (
                <div className="flex flex-col gap-2">
                  {searchResult?.slice(0, 5)?.map((user) => (
                    <UserListItem
                      key={user?._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))}
                </div>
              )}
            </div>

            {details?.groupAdmin?._id === user?._id ? (
              <button
                onClick={() => handleAddUser(selectedUser)}
                className="bg-teal-700 text-white justify-self-end font-bold text-md p-2 w-1/2 mx-auto rounded-lg mt-2 h-10"
              >
                Update
              </button>
            ) : (
              <button
                onClick={() => handleRemoveUser(selectedUser)}
                className="bg-red-500 text-white justify-self-end font-bold text-md p-2 w-1/2 mx-auto rounded-lg mt-2 h-10"
              >
                Leave Group
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateGroup;
