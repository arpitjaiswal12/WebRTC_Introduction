
# An Video Call application - WebRTC

WebRTC- Enables real-time communication capabilities such as audio, video, and data sharing directly in web browsers



## Peer connection

WebRTC specifications that deals with connecting two applications on different computers to communicate using a peer-to-peer protocol.

The peer-to-peer connectivity is handled by the RTCPeerConnection interface. This is the central point for establishing and controlling the connection between two peers in WebRTC.



## Exchange Session Description

Once the RTCPeerConnection is created we need to create an **SDP offer or answer**, depending on if we are the calling peer or receiving peer. Once the SDP offer or answer is created, it must be sent to the remote peer through a different channel.
## Signaling

Passing SDP objects to remote peers is called signaling and is not covered by the WebRTC specification. 

### ICE 
Before two peers can communitcate using WebRTC, they need to exchange connectivity information.

Since the network conditions can vary depending on a number of factors, an external service is usually used for discovering the possible candidates for connecting to a peer. This service is called ICE and is using either a STUN or a TURN server. STUN stands for Session Traversal Utilities for NAT, and is usually used indirectly in most WebRTC applications.

For ICE information, ICE agent of each peer automatically begins the process of discovering all the possible candidate after multimedia communication, whenever a new candidate is discovered, the information of this candidate will be sent to others peers by server’s forwarding. The other peers configure its remote ICE candidate once received information. 


![App Screenshot](https://github-production-user-asset-6210df.s3.amazonaws.com/97618151/327394118-998ad011-2386-4f86-9e0d-f639c563e778.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240502%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240502T102218Z&X-Amz-Expires=300&X-Amz-Signature=bafbceb893aab9c5e56e1312f4a9712e0067c63417ce6881008064167769e32c&X-Amz-SignedHeaders=host&actor_id=97618151&key_id=0&repo_id=791959113)

![](https://github-production-user-asset-6210df.s3.amazonaws.com/97618151/327395933-59fb0c0a-cfea-4084-81da-5d69af2858b8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240502%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240502T102352Z&X-Amz-Expires=300&X-Amz-Signature=4870287cb30dee9538e33682a6c1b9da2394cc2dbe988b4b2b78dd33bf3e075e&X-Amz-SignedHeaders=host&actor_id=97618151&key_id=0&repo_id=791959113)

