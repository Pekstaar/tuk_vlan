import React, { useEffect, useRef, useState } from "react";
import ReactScrollableFeed from "react-scrollable-feed";
import { MdFaceRetouchingNatural } from "react-icons/md";
import { AiOutlinePaperClip } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { MdOutlineKeyboardHide } from "react-icons/md";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import { MainState } from "../../services/context/MainContext";
import { getSender } from "../../utils";
import ChatService from "../../services/ChatService";
import io from "socket.io-client";
import { ENDPOINT } from "../../services/AxiosService";
import Lottie from "react-lottie";
import animationData from "../../assets/animations/typing.json";
// import EmojiPicker from "../EmojiPicker";

var socket, selectedChatCompare;

export const Chats = (props) => {
  const { user } = MainState();
  const { selectedChat, setShowMedia, showMedia } = MainState();

  const messageRef = useRef();
  const [showEmojis, setShowEmojis] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState({ messages: [] });
  const [socketConnection, setSocketConnection] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [loading, setLoading] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // const [displayAttach, setDisplayAttach] = useState("");

  // function to handle emojis.
  const handleEmojis = () => {
    // messageRef.current.focus();
    setShowEmojis(!showEmojis);
  };

  const handleFetchMessages = async () => {
    setLoading(true);
    if (!selectedChat._id) return;

    try {
      const res = await ChatService.fetchMessages(selectedChat?._id);

      // console.log(res);
      setMessages(res);
      setLoading(false);

      socket.emit("join chat", selectedChat?._id);
    } catch (error) {
      console.log("GET MESSAGES ERROR: ", error);
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    socket.emit("stop typing", selectedChat._id);
    // e.preventDefault();
    // setLoading(true);

    try {
      setNewMessage("");

      const data = await ChatService.sendMessage({
        content: newMessage,
        chatId: selectedChat._id,
      });
      console.log(data);

      // setLoading(false);
      socket.emit("new message", data);
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.log("SEND MESSAGE ERROR: ", error);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      await sendMessage(e);
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    await sendMessage();
  };

  // const handleEmojiChange = (item) => {
  //   setNewMessage(`${newMessage} ${item.native}`);
  // };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnection(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [user]);

  useEffect(() => {
    // messageRef.current.focus();
    handleFetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat?._id]);

  useEffect(() => {
    socket.on("message received", (messageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== messageReceived.chat._id
      ) {
        //give notification
      } else {
        setMessages([...messages, messageReceived]);
      }
    });
  });

  const handleTyping = (e) => {
    // console.log(socketConnection);
    setNewMessage(e.target.value);

    // Typing indicator
    if (!socketConnection) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {/* mini nav */}
      {chats === "empty" ? (
        // chat empty
        <div className="flex h-full w-full justify-center items-center">
          <span>Chat Empty</span>
        </div>
      ) : (
        <div className="flex flex-col w-full relative">
          {/* loader */}
          {loading ? (
            <div className="w-full bg-indigo-50 h-full flex-grow mx-1 my-3 flex justify-center items-center">
              <h2 className="text-gray-400 text-center">
                <CircularProgress color="inherit" />
                <br />
                <span className="font-medium">loading chats...</span>
              </h2>
            </div>
          ) : (
            // message sender
            <div className="h-[92%]">
              <div className="mx-1 p-1 flex items-center justify-between text-lg font-medium">
                <span className="text-gray-500">
                  {selectedChat?.isGroupChat
                    ? selectedChat?.chatName.toUpperCase()
                    : getSender(user, selectedChat?.users)?.toUpperCase()}
                </span>

                <button
                  className="bg-teal-600 hover:bg-teal-800 focuse:bg-teal-800 rounded-lg p-2 text-white"
                  onClick={() => setShowMedia((prev) => !prev)}
                >
                  {!showMedia ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </button>
              </div>

              <ReactScrollableFeed
                onClick={() => setShowEmojis(false)}
                className="chats flex-grow bg-indigo-50 overflow-y-scroll mx-1 my-2 flex flex-col relative"
              >
                {/* Chat friends */}
                {messages && messages.length === 0 ? (
                  <div className=" h-full w-full flex flex-col justify-center items-center">
                    <MdOutlineKeyboardHide className="text-4xl text-gray-400" />
                    <p className="font-bold text-center text-xl text-gray-400">
                      Type a message
                      <br /> to start chat
                    </p>
                  </div>
                ) : (
                  messages &&
                  messages?.map((mes, id) => {
                    return mes?.sender?._id === user?._id ? (
                      <MyMessage message={mes} key={id} />
                    ) : (
                      <FriendMessage
                        isGroupChat={selectedChat?.isGroupChat}
                        message={mes}
                        key={id}
                      />
                    );
                  })
                )}
              </ReactScrollableFeed>
            </div>
          )}

          {/* display attachments */}
          {/* <div className="attachments flex flex-wrap bg-white absolute right-20 bottom-16 z-50">
        <IoDocumentsSharp />
      </div> */}

          {/* emojis div */}
          <div
            className={`${
              !showEmojis && "hidden"
            } z-40 absolute bottom-20 left-7`}
          >
            {/* <EmojiPicker onEmojiClick={""} /> */}
            {/* <EmojiPicker onEmojiSelect={console.log} /> */}

            <span
              className=" absolute z-50 text-red-600 cursor-pointer p-1 bg-white rounded-full"
              style={{ top: "-15px", left: "-10px" }}
              onClick={() => setShowEmojis(!showEmojis)}
            >
              <MdCancel className="text-2xl " />
            </span>
          </div>

          <div className="w-full p-1 absolute bottom-0">
            {isTyping ? (
              <Lottie
                options={defaultOptions}
                // height={50}
                width={70}
                style={{ marginBottom: 15, marginLeft: 0 }}
              />
            ) : (
              ""
            )}
            <div
              // onSubmit={sendMessage}
              onKeyDown={handleKeyPress}
              className=" flex p-2  mx-auto mb-1 bg-indigo-100 "
            >
              {/* send message */}
              <input
                type={"text"}
                className="flex-grow p-2 text text-gray-600 outline-none border-0 rounded-tl rounded-bl"
                placeholder="Write your message here. . ."
                value={newMessage}
                onChange={handleTyping}
                ref={messageRef}
              />

              {/* icons */}
              <span
                className="h-12 bg-white flex items-center cursor-pointer "
                onClick={() => handleEmojis()}
              >
                <MdFaceRetouchingNatural className="text-2xl mx-1 text-gray-400 hover:text-gray-600" />
              </span>

              {/* attachfile */}
              <div className="h-12 bg-white flex items-center cursor-pointer">
                <AiOutlinePaperClip className="text-2xl mx-2 text-gray-400 " />
              </div>

              {/* send button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="mx-2 p-2 bg-green-300 outline-none rounded cursor-pointer hover:bg-green-200"
              >
                <IoIosSend className="text-3xl text-green-900" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const FriendMessage = ({ message, isGroupChat }) => {
  return (
    <div className="block m-1 px-3">
      <div
        className="bg-gray-50 inline-block p-2 rounded-t-2xl rounded-br-2xl text-sm"
        style={{ maxWidth: "70%" }}
      >
        {message?.content}
      </div>
      <br />
      <span className="text-gray-500" style={{ fontSize: "12px" }}>
        {isGroupChat && (
          <strong>
            {message?.sender?.name}
            &nbsp;
          </strong>
        )}
        {moment(new Date(message?.updatedAt), "YYYYMMDD").fromNow()}
      </span>
    </div>
  );
};
const MyMessage = ({ message }) => {
  return (
    <div className=" m-1 px-3 flex flex-row-reverse">
      <div className="flex flex-col" style={{ maxWidth: "70%" }}>
        <div
          style={{ backgroundColor: "#08112Dc0" }}
          className="  p-2 rounded-t-2xl text-gray-100 px-4 rounded-bl-2xl flex"
        >
          {message?.content}
        </div>
        <span className="text-sm text-gray-500 " style={{ fontSize: "13px" }}>
          {/* {moment(message.createdAt.toDate(), "YYYYMMDD").fromNow()} */}
        </span>
      </div>
    </div>
  );
};
