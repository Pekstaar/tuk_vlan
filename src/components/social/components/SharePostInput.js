import React from "react";

const SharePostInput = () => {
  const [showNewPostModal, setNewPostModal] = React.useState(false);

  const handleShowModal = () => {
    setNewPostModal(false);
  };

  return (
    <div className="bg-white border-2 rounded-2xl p-3">
      <div className="flex p-2 items-center gap-3">
        <Image
          img={
            "https://media.istockphoto.com/photos/side-portrait-of-laughing-african-american-man-looking-up-picture-id1142003972?k=20&m=1142003972&s=612x612&w=0&h=583slP1jSnOeOvU_-g7XCvFSaGaivDvKQj2KNv34Kr4="
          }
        />

        <div
          onPress={handleShowModal}
          type="button"
          className="p-2 focus:outline-none bg-slate-200 rounded-full flex-grow h-10 cursor-pointer text-gray-500"
        >
          what's in your mind, New User?
        </div>
      </div>
      <hr />
    </div>
  );
};

export default SharePostInput;

const Image = ({ img }) => (
  <div className="h-12 w-12 -ml-2 flex rounded-full justify-between items-center border-2 border-teal-600 overflow-hidden  ">
    <img src={img} alt="img" className="w-full h-full object-cover " />
  </div>
);
