import React, { createContext } from "react";

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  //   const [peers, dispatch] = useReducer(PeerReducer, {});

  //   const [me, setMe] = React.useState();
  //   const [stream, setStream] = React.useState();
  //   const [screenSharingId, setScreenSharingId] = React.useState();

  //   const enterRoom = ({ roomId }) => {
  //     console.log("Entered: ", { roomId });
  //     navigate(`/meet/${roomId}#init`);
  //   };

  //   const getUsers = ({ participants }) => {
  //     console.log(participants);
  //   };

  //   const removePeer = ({ peerId }) => {
  //     dispatch(removePeerActions(peerId));
  //     // console.log("remove peer", peerId);
  //     // console.log("Peer removed!");
  //   };

  // const switchStream = (stream) => {
  //   setStream(stream);
  //   setScreenSharingId(me?.id || "");

  //   Object.values(me?.connections).forEach((connection) => {
  //     const videoTrack = stream
  //       ?.getTracks()
  //       .find((track) => track.kind === "video");

  //     console.log("senders", connection[0].peerConnection.getSenders()[1]);

  //     connection[0].peerConnection
  //       .getSenders()[1]
  //       .replaceTrack(videoTrack)
  //       .catch((err) => console.log("Video track error: ", err));
  //   });
  // };

  // const shareScreen = () => {
  //   if (screenSharingId) {
  //     navigator.mediaDevices
  //       .getUserMedia({ video: true, audio: true })
  //       .then(switchStream);
  //   } else {
  //     navigator.mediaDevices.getDisplayMedia({}).then(switchStream);
  //   }
  // };

  // React.useEffect(() => {
  //   const meId = shortid.generate();
  //   const peer = new Peer(meId);
  //   setMe(peer);

  //   try {
  //     navigator.mediaDevices
  //       .getUserMedia({ video: true, audio: true })
  //       .then((stream) => {
  //         setStream(stream);
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   ws.on("room-created", enterRoom);
  //   ws.on("get-users", getUsers);
  //   ws.on("user-disconnected", removePeer);

  //   return () => {
  //     ws.off("room-created");
  //     ws.off("get-users");
  //     ws.off("user-disconnected");
  //     // ws.off("user-shared-screen");
  //     // ws.off("user-stopped-sharing");
  //     ws.off("user-joined");
  //   };
  // }, []);

  // React.useEffect(() => {
  //   if (!me) return;
  //   if (!stream) return;

  //   ws.on("user-joined", ({ peerId }) => {
  //     const call = me.call(peerId, stream);

  //     call.on("stream", (peerStream) => {
  //       dispatch(addPeerActions(peerId, peerStream));
  //     });
  //   });

  //   me.on("call", (call) => {
  //     call.answer(stream);
  //     call.on("stream", (peerStream) => {
  //       dispatch(addPeerActions(call.peer, peerStream));
  //     });
  //   });
  // }, [me, stream]);

  // React.useEffect(() => {
  //   console.log("PEERS", peers);
  // }, [peers]);

  return <RoomContext.Provider value={{}}>{children}</RoomContext.Provider>;
};

export default RoomProvider;
