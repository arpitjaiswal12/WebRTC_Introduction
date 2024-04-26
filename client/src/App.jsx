import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { SocketProvider } from "./providers/socket";
function App() {
  return (
    <>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room/:roomId" element={<h1>hello new room </h1>} />
        </Routes>
      </SocketProvider>
    </>
  );
}

export default App;
