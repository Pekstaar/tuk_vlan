import { Badge } from "@mui/material";
import React from "react";
import { useState } from "react";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineLike,
  AiTwotoneLike,
} from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import ActionButton from "./ActionButton";

const Post = ({
  img,
  title,
  desc,
  user,
  isLiked,
  handleLike,
  handleUnlike,
  likes,
  handleComment,
  post_id,
  comments,
}) => {
  const [hide, setHide] = useState(true);
  const [comment, setComment] = useState("");
  return (
    <div className="w-full rounded-xl my-2 overflow-hidden bg-white border-2 border-gray-400 relative">
      <button className="absolute top-1 right-1 z-10">
        <BsThreeDotsVertical className="text-xl text-gray-500" />
      </button>

      {/* title */}
      <div className="text-xl font-medium p-2 flex justify-between items-center">
        <span>{title}</span>
        <span className="text-sm text-gray-500 font-medium">
          {/* Posted by: {user?.name} */}
        </span>
      </div>
      {img !== "" && (
        <img src={img} alt={img} className={"h-[350px] w-full object-cover"} />
      )}
      <div className="p-2">
        <p className="text-sm text-gray-700 px-2 font-normal">
          {desc.length > 690 && hide ? (
            <>
              {desc.slice(0, 680)}&nbsp;
              <button
                onClick={() => setHide(false)}
                className="font-medium text-black text-[16px]"
              >
                {"more. . .>>"}
              </button>{" "}
            </>
          ) : (
            <>
              {desc}
              {desc?.length > 680 && (
                <button
                  onClick={() => setHide(true)}
                  className="font-medium text-black text-[16px]"
                >
                  {"Hide <<"}
                </button>
              )}
            </>
          )}
        </p>
        {/* description */}
      </div>

      {/* actions */}
      <div className="border-t border-zinc-300">
        <div className="flex justify-between px-4 items-center py-2 ">
          <div className="flex gap-2">
            <Badge badgeContent={likes?.length} color="primary">
              <ActionButton
                handleClick={isLiked ? handleUnlike : handleLike}
                isCurrent={isLiked}
              >
                {isLiked ? (
                  <AiTwotoneLike className="text-xl" />
                ) : (
                  <AiOutlineLike className="text-xl" />
                )}
              </ActionButton>
            </Badge>

            <Badge badgeContent={comments?.length} color="primary">
              <ActionButton>
                <FaComment className="text-xl" />
              </ActionButton>
            </Badge>
          </div>
          {/* likes */}

          <div className="flex ">
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
              Liked by
              <span className="font-bold text-gray-800">
                {" "}
                {likes.length}
              </span>{" "}
              people
            </span>
          </div>
        </div>
        <div className="bg-zinc-400">
          <Comments
            comments={comments}
            comment={comment}
            handleComment={(e) => {
              e.preventDefault();
              // console.log(e);
              handleComment(comment, post_id);
              setComment("");
            }}
            handleChange={(e) => setComment(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;

const Image = ({ img }) => (
  <div className="h-8 w-8 -ml-2 flex rounded-full justify-between items-center border-2 border-teal-600 overflow-hidden  ">
    <img src={img} alt="img" className="w-full h-full object-cover " />
  </div>
);

const Comments = ({ handleComment, handleChange, comment, comments }) => {
  const [showItems, setShowItems] = useState(1);

  return (
    <div className="p-2">
      {/* comment form */}
      <form onSubmit={handleComment} action="" className="flex gap-2 mb-2">
        <div className="h-10 w-10 shrink-0 rounded-full bg-teal-500 text-white font-bold uppercase flex items-center justify-center">
          E
        </div>

        <input
          onChange={handleChange}
          value={comment}
          type="text"
          placeholder="write a comment on this post . . ."
          className="rounded-full flex-grow bg-zinc-300 px-2"
        />

        <button>
          {showItems === 1 ? <AiFillCaretDown /> : <AiFillCaretUp />}
        </button>
      </form>

      <div className="flex flex-col gap-1">
        {/* single comment */}
        {comments
          ?.reverse()
          .slice(0, showItems)
          .map(({ postedBy, text }) => (
            <div div className="flex gap-2">
              {/* user avatar */}
              <div className="h-10 w-10 shrink-0 rounded-full bg-teal-500 text-white font-bold uppercase flex items-center justify-center">
                {postedBy?.name?.slice(0, 1)}
              </div>

              {/* comment */}
              <div className="bg-zinc-300 rounded-2xl text-zinc-900 p-2 flex flex-col gap-2">
                {/* comment */}

                <div className="text-zinc-800 inline-flex">{text}</div>

                {/* commented by */}
                <div className="text-zinc-500">
                  comment By:&nbsp;
                  <span className="font-medium text-zinc-600">
                    {postedBy?.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      <button
        onClick={() => {
          if (showItems === 1) {
            setShowItems(comments?.length);
          } else {
            setShowItems(1);
          }
        }}
        className="border-b cursor-pointer inline-flex border-indigo-600 text-violet-700 font-medium mt-1"
      >
        {showItems === 1 ? "View More comments ..." : "Hide Comments"}
      </button>
    </div>
  );
};
