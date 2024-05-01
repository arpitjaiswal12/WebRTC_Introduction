import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { SocketProvider } from "./providers/socket.jsx";
import RoomPage from "./pages/RoomPage";
import { PeerProvider } from "./providers/peer.jsx";
function App() {
  return (
      <SocketProvider>
        <PeerProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
          </Routes>
        </PeerProvider>
      </SocketProvider>
  );
}

export default App;
