import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "../../Modal";

const NewPostModal = ({
  isOpen,
  setOpen,
  handleClose,
  handleSubmit,
  handleChange,
  loading,
}) => {
  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <div className="">
        {/* header */}
        <div className="flex justify-between bg-teal-900 h-10 items-center px-2">
          <span className="font-semibold text-sm text-white">
            Create New Post
          </span>

          <button
            onClick={handleClose}
            className="w-6 h-6  bg-red-500 flex items-center justify-center text-white p-0 rounded-full"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* body */}

        <form onSubmit={handleSubmit} className="p-2 bg-gray-50">
          <Input
            label={"Post title"}
            name={"title"}
            handleChange={handleChange}
          />
          <TextArea
            label={"Post body"}
            name={"text"}
            handleChange={handleChange}
          />
          <Input
            label={"photo url(optional)"}
            placeholder={"first post photo"}
            name={"photo_1"}
            handleChange={handleChange}
          />
          <Input
            label={"photo url(optional)"}
            placeholder={"second post photo"}
            name={"photo_2"}
            handleChange={handleChange}
          />

          {/* footer */}
          <div className="flex p-1 mt-3 justify-center">
            <button
              disabled={loading}
              type="submit"
              className={`${
                loading ? "bg-[#134E4A80] cursor-not-allowed" : "bg-[#134E4AC0]"
              } rounded-md text-white p-2 w-4/5`}
            >
              {loading ? "Posting . . ." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewPostModal;

const Input = ({ label, handleChange, placeholder, value, name }) => (
  <div className=" p-1 ">
    <div className="text-sm">{label}</div>

    <input
      type="text"
      className="h-8 mt-1 border border-gray-400  w-full px-2"
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
    />
  </div>
);
const TextArea = ({ label, handleChange, name }) => (
  <div className=" p-1  ">
    <div className="text-sm">{label}</div>

    <textarea
      type="text"
      rows={"4"}
      className="px-2 mt-1 border border-gray-400  w-full"
      name={name}
      onChange={handleChange}
    />
  </div>
);
