import React from "react";
import { AiTwotoneLike } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import ActionButton from "./ActionButton";

const Post = ({ img, title, desc }) => {
  return (
    <div className="w-full rounded-xl my-2 overflow-hidden bg-white border-2 border-gray-400 relative">
      <button className="absolute top-1 right-1 z-10">
        <BsThreeDotsVertical className="text-xl text-gray-500" />
      </button>
      <img src={img} alt={img} className={"h-[350px] w-full object-cover"} />

      <div className="p-2">
        {/* title */}
        <div className="text-lg font-semibold p-2">{title}</div>

        <p className="text-sm text-gray-700 px-2 font-normal">{desc}</p>
        {/* description */}
      </div>

      {/* actions */}
      <div className="flex justify-between px-4 items-center py-2">
        <div className="flex gap-2">
          <ActionButton isCurrent>
            <AiTwotoneLike className="text-xl" />
          </ActionButton>

          <ActionButton>
            <FaComment className="text-xl" />
          </ActionButton>
        </div>
        {/* likes */}

        <div className="flex">
          <div className="flex mx-2">
            <Image
              img={
                "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
            />{" "}
            <Image
              img={
                "https://images.pexels.com/photos/12839587/pexels-photo-12839587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
            />{" "}
            <Image
              img={
                "https://images.pexels.com/photos/296115/pexels-photo-296115.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
            />{" "}
            <Image
              img={
                "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=600 "
              }
            />
          </div>
          <span className="font-semibold  text-gray-500 text-sm m-auto">
            Liked by{" "}
            <span className="font-bold text-gray-800">Eric Pekmah</span> and{" "}
            <span className="font-bold text-gray-800">300</span> others
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Post;

const Image = ({ img }) => (
  <div className="h-8 w-8 -ml-2 flex rounded-full justify-between items-center border-2 border-teal-600 overflow-hidden  ">
    <img src={img} alt="img" className="w-full h-full object-cover " />
  </div>
);
