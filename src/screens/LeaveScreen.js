import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

const LeaveCall = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ fontFamily: "poppins" }}
      className="h-screen  bg-gray-50 flex items-center justify-center flex-col gap-5"
    >
      <div className="text-4xl font-medium text-gray-600">
        You have Left the meeting
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            window.history.back();
          }}
          className="text-teal-600  border-2 border-teal-600 py-1.5 px-4 rounded-md"
        >
          Rejoin
        </button>

        <button
          onClick={() => {
            navigate("/");
          }}
          className="text-white  border-2 bg-teal-600 py-1.5 px-4 rounded-md"
        >
          Return to home screen
        </button>
      </div>

      <div className=" p-8 flex flex-col shadow bg-white rounded-sm items-center gap-4">
        <div className="text-xl  text-gray-600">
          How was the audio and video?
        </div>
        <div className="flex gap-3 text-2xl">
          <FontAwesomeIcon className="text-teal-600" icon={faStar} />
          <FontAwesomeIcon className="text-teal-600" icon={faStar} />
          <FontAwesomeIcon className="text-teal-600" icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </div>
      </div>
    </div>
  );
};

export default LeaveCall;
