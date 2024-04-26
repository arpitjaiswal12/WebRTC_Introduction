import { ArrowRight } from "lucide-react";
import { useSocket } from "../providers/socket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { socket } = useSocket();
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState();
  const [roomId, setRoomId] = useState();

  const handleRoomJoined = ({ roomId }) => {
    console.log("Room Joined", roomId);
    navigate(`/room/${roomId}`);
  };

  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);
  }, [socket]);

  const handleJoinRoom = () => {
    socket.emit("join-room", { emailId: emailId, roomId: roomId });
  };
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/256/5761/5761917.png"
              className=" w-20 "
            />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Join to video call
          </h2>

          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    value={emailId}
                    onChange={(e) => {
                      setEmailId(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Room Number{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="Number"
                    placeholder="Enter your room number"
                    value={roomId}
                    onChange={(e) => {
                      setRoomId(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  onClick={handleJoinRoom}
                >
                  Get started <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
