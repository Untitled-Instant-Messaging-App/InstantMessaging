import "./styles/App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useState } from "react";
import Safe from "./assets/Safe";
import Rocket from "./assets/Rocket";
import Phone from "./assets/Phone";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  window.electron.isAuthenticated((_, state) => setIsAuthenticated(state));
  window.electron.isRegistered((_, state) => setIsRegistered(state));

  const [selectedChat, setSelectedChat] = useState(null);

  if (!isRegistered) {
    return <Register />;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    isAuthenticated && (
      <div className="app-wrapper">
        <Sidebar onClick={setSelectedChat} />
        {selectedChat ? (
          <Chat chat={selectedChat} />
        ) : (
          <div className="hello-there">
            <div>
              <h1>Secure</h1>
              <Safe />
              <p>E2E encrypted messages using the Signal Protocol</p>
            </div>
            <div>
              <h1>Fast</h1>
              <Rocket />
              <p>Using fast and decentralized XMPP communication</p>
            </div>
            <div>
              <h1>Intuitive</h1>
              <Phone />
              <p>Familar design language we all expect for messaging</p>
            </div>
          </div>
        )}
      </div>
    )
  );
}
