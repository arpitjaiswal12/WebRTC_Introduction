import { useCallback, useEffect } from "react";
import { useSocket } from "../providers/socket";
import { usePeer } from "../providers/peer";
import { useState } from "react";
import ReactPlayer from "react-player";

export default function RoomPage() {
  const { socket } = useSocket();

  const { peer, creatOffer, createAnswer, setRemoteAnswer, sendStream } =
    usePeer();

  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log("New user Joined room", emailId);
      // create offer
      const offer = await creatOffer();
      console.log(offer);
      // sending singling the offer to another client
      socket.emit("call-user", { emailId, offer });
    },
    [creatOffer, socket]
  );

  const handleIncommingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      console.log("Incomming call from ", from, offer);
      // jab bhe offer aya usko yaad kr lo aur ek answer generate krna padega

      // takin answer
      const ans = await createAnswer(offer);
      socket.emit("call-accepted", { emailId: from, ans });
    },
    [createAnswer, socket]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      console.log("call got acceptd", ans);
      await setRemoteAnswer(ans);
    },
    [setRemoteAnswer]
  );

  const getUserMediaStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    sendStream(stream);
    setMyStream(stream);
  }, []);

  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incomming-call", handleIncommingCall);
    socket.on("call-accepted", handleCallAccepted);

    //clean up multiple calls
    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incomming-call", handleIncommingCall);
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [handleNewUserJoined, handleIncommingCall, handleCallAccepted, socket]);

  useEffect(() => {
    getUserMediaStream();
  });

  return (
    <>
      <div>My Room page</div>
      <ReactPlayer url={myStream} playing muted />
    </>
  );
}
