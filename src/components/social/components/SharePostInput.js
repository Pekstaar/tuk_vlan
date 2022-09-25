import React from "react";
import { MainState } from "../../../services/context/MainContext";

const SharePostInput = ({ handleShowModal }) => {
  // const [showNewPostModal, setNewPostModal] = React.useState(false);
  const { user } = MainState();

  return (
    <div className="bg-white border-2 rounded-2xl p-3 sticky top-0 z-10">
      <div className="flex p-2 items-center gap-3">
        <Image user={user} />

        <div
          onClick={handleShowModal}
          type="button"
          className="p-2 focus:outline-none bg-slate-200 rounded-full flex-grow h-10 cursor-pointer text-gray-500"
        >
          what's in your mind, {user?.name}?
        </div>
      </div>
      <hr />
    </div>
  );
};

export default SharePostInput;

const Image = ({ user }) => (
  <div className="h-12 w-12 -ml-2 flex rounded-full justify-between bg-teal-500 items-center border-2 border-white overflow-hidden  ">
    <span className="m-auto text-lg text-white">{user?.name?.slice(0, 1)}</span>
  </div>
);
