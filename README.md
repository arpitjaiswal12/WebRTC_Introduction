
# An Video Call application - WebRTC

WebRTC- Enables real-time communication capabilities such as audio, video, and data sharing directly in web browsers
UDP uses WebRTC.


## Peer connection

WebRTC specifications that deals with connecting two applications on different computers to communicate using a peer-to-peer protocol.

The peer-to-peer connectivity is handled by the RTCPeerConnection interface. This is the central point for establishing and controlling the connection between two peers in WebRTC.
#### ICE (Interactive Connectivity Establishment): 
This protocol is used for NAT traversal to establish peer-to-peer connections between devices.

## Exchange Session Description

Once the RTCPeerConnection is created we need to create an **SDP offer or answer**, depending on if we are the calling peer or receiving peer. Once the SDP offer or answer is created, it must be sent to the remote peer through a different channel.
## Signaling

Passing SDP objects to remote peers is called signaling and is not covered by the WebRTC specification. 

### ICE 
Before two peers can communitcate using WebRTC, they need to exchange connectivity information.

Since the network conditions can vary depending on a number of factors, an external service is usually used for discovering the possible candidates for connecting to a peer. This service is called ICE and is using either a STUN or a TURN server. STUN stands for Session Traversal Utilities for NAT, and is usually used indirectly in most WebRTC applications.

For ICE information, ICE agent of each peer automatically begins the process of discovering all the possible candidate after multimedia communication, whenever a new candidate is discovered, the information of this candidate will be sent to others peers by server’s forwarding. The other peers configure its remote ICE candidate once received information. 

### SRTP (Secure Real-time Transport Protocol): 
SRTP is used to encrypt and secure the media streams (audio, video) transmitted over WebRTC connections.

![image](https://github.com/arpitjaiswal12/WebRTC_project/assets/97618151/de1682a4-bcc7-40bf-98de-a2d278d763d3)

#### How WebRTC Works:
![image](https://github.com/arpitjaiswal12/WebRTC_project/assets/97618151/4e9bd640-8b07-43da-8f83-35b212130d81)



