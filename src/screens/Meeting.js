import React, { useState } from "react";
import Header from "../components/meeting/Header";
import meeting from "../assets/images/virtual-meeting.png";
import { MdVideocam } from "react-icons/md";
import firepadRef from "../server/firebase";
import { SideNav } from "../components/SideNav";

const Meeting = () => {
  const [meetingCode, setMeetingCode] = useState("");

  const handleClick = () => {
    const newF = firepadRef.push();
    window.location.href = `/call?id=${newF.key}`;
  };

  const handleJoin = () => {
    window.location.href = `/call?id=${meetingCode}`;
  };

  return (
    <main className="container mx-auto p-2 flex flex-col ">
      <div
        className="bg-white  flex px-2 overflow-hidden"
        style={{ maxHeight: "96vh", minHeight: "730px" }}
      >
        {/* side Icons Nav */}
        <SideNav />

        <div className="bg-gray-200 flex flex-1 flex-grow flex-col">
          <Header />

          <div className="flex items-center min-h-[92.5vh]">
            {/* left side */}
            <div className="flex-[0.8] p-5">
              <span className="text-4xl font-medium">
                Premium video meetings
              </span>
              <br />
              <span className="text-3xl font-medium">Let's Learn</span>

              <p className="text-gray-500 my-3 text-xl">
                Tuk-vlan service for secure learning meetings,
                <br /> free and available for all.
              </p>

              {/* form */}
              <div className="flex gap-4 my-8">
                <button
                  onClick={handleClick}
                  className="bg-teal-600 flex items-center gap-1 text-white p-2.5 rounded-lg font-medium"
                >
                  <MdVideocam className="text-xl" />
                  New Meeting
                </button>

                <input
                  type="text"
                  className="p-2.5 border-gray-500 border-2 rounded w-[280px]"
                  placeholder="Enter code or meeting link"
                  onChange={(e) => setMeetingCode(e?.target?.value)}
                  value={meetingCode}
                />

                <button
                  onClick={handleJoin}
                  className="text-teal-600 hover:bg-teal-100 p-2.5 w-[80px] text-center rounded-lg font-medium"
                >
                  Join
                </button>
              </div>

              <hr />
            </div>

            <div className="flex-1">
              <img src={meeting} alt="" />
            </div>
          </div>

          {/* right side */}
        </div>
      </div>
    </main>
  );
};

export default Meeting;

// shortid
// simple-peer
// socket.io-client

// call page
// call home page
