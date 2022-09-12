import React from "react";

const CallVideo = ({ stream }) => {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div>
      <video
        //   src=""
        ref={videoRef}
        className=" object-cover -z-10 "
        controls
        autoPlay
        muted
      />
    </div>
  );
};

export default CallVideo;
