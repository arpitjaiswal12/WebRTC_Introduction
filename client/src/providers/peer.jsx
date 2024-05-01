import React, { useMemo } from "react";

const PeerContext = React.createContext(null);

export const usePeer = () => React.useContext(PeerContext);

export const PeerProvider = (props) => {
  const peer = useMemo(
    () =>
      new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      }),
    []
  );

  const creatOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(peer); // this offer is set to user local description
    return offer;
  };

  //offer dusre user ke ayegi
  // first learn remote offer
  //then create answer
  // then learn answer

  const createAnswer = async (offer) => {
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  };

  // now we need to again send this answer to initial user

  const setRemoteAnswer = async (ans) => {
    await peer.setRemoteDescription(ans);
  };

  const sendStream = async (stream) => {
    const tracks = stream.getTracks();
    for (const track of tracks) {
      peer.addTrack(track, stream);
    }
  };

  return (
    <PeerContext.Provider
      value={{ peer, creatOffer, createAnswer, setRemoteAnswer, sendStream }}
    >
      {props.children}
    </PeerContext.Provider>
  );
};
