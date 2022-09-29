import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVideo,
  faDesktop,
  faVideoSlash,
  faMicrophoneSlash,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import "./MeetingFooter.css";
import { FaLink } from "react-icons/fa";
import { IoRecordingSharp } from "react-icons/io5";
import { BsRecordCircle } from "react-icons/bs";
import { connect } from "react-redux";
const MeetingFooter = (props) => {
  const [streamState, setStreamState] = useState({
    mic: true,
    video: false,
    screen: false,
  });
  const [isRecording, setIsRecording] = useState(false);

  const micClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        mic: !currentState.mic,
      };
    });
  };

  const onVideoClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        video: !currentState.video,
      };
    });
  };

  const onScreenClick = () => {
    props.onScreenClick(setScreenState);
  };

  const onLeaveMeeting = () => {
    window.location.href = "/leave";
  };

  const setScreenState = (isEnabled) => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        screen: isEnabled,
      };
    });
  };

  const chunks = [];
  var recorder;

  const record = (stream) => {
    recorder = new MediaRecorder(stream, {
      mineType: "video/webm;codecs=H264",
    });
    recorder.onstop = (e) => {
      recorder = null;
    };
    recorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
  };

  const handleRecording = () => {
    // recording start
    setIsRecording(!isRecording);

    if (isRecording === false) {
      // recording
      record(props?.stream);
      recorder?.start(1000);
    }
    // recording stop
    else {
      const completeBlob = new Blob(chunks, { type: chunks[0]?.type });
      var anchor = document.createElement("a");
      document.body.appendChild(anchor);
      anchor.style = "display: none";
      var url = window.URL.createObjectURL(completeBlob);
      anchor.href = url;
      anchor.download = `aaaa.mp4`;
      anchor.click();
      window.URL.revokeObjectURL(url);
      recorder?.stop();

      while (chunks.length) {
        chunks.pop();
      }
    }
  };
  useEffect(() => {
    props.onMicClick(streamState.mic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamState.mic]);
  useEffect(() => {
    props.onVideoClick(streamState.video);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamState.video]);
  return (
    <div className="meeting-footer">
      {isRecording && (
        <div className={"absolute top-4 left-4 z-[200] text-white"}>
          <BsRecordCircle className={"text-4xl text-red-500 "} />
        </div>
      )}
      <div
        className={"meeting-icons " + (!streamState.mic ? "active" : "")}
        data-tip={streamState.mic ? "Mute Audio" : "Unmute Audio"}
        onClick={micClick}
      >
        <FontAwesomeIcon
          icon={!streamState.mic ? faMicrophoneSlash : faMicrophone}
          title="Mute"
        />
      </div>
      <div
        className={"meeting-icons " + (!streamState.video ? "active" : "")}
        data-tip={streamState.video ? "Hide Video" : "Show Video"}
        onClick={onVideoClick}
      >
        <FontAwesomeIcon icon={!streamState.video ? faVideoSlash : faVideo} />
      </div>
      <div
        className="meeting-icons"
        data-tip="Share Screen"
        onClick={onScreenClick}
        disabled={streamState.screen}
      >
        <FontAwesomeIcon icon={faDesktop} />
      </div>

      <div
        className="meeting-icons"
        data-tip="Leave Meeting"
        onClick={onLeaveMeeting}
        // disabled={streamState.screen}
      >
        <FontAwesomeIcon icon={faPhone} />
      </div>

      <div
        className="meeting-icons"
        data-tip={isRecording ? "Start recording Meeting" : "Stop recording"}
        onClick={handleRecording}
        // disabled={streamState.screen}
      >
        <IoRecordingSharp />
      </div>

      <div
        className="meeting-icons"
        data-tip="Copy Link"
        onClick={props.onToggleLinkCard}
        // disabled={streamState.screen}
      >
        <FaLink />
      </div>
      <ReactTooltip />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    stream: state.mainStream,
  };
};
export default connect(mapStateToProps)(MeetingFooter);
