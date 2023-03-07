import "./styles/App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useEffect, useState } from "react";
import Safe from "./assets/Safe";
import Rocket from "./assets/Rocket";
import Phone from "./assets/Phone";

export default function App() {
  const [isAuthed, setIsAuthed] = useState<boolean>();
  const [isRegistered, setIsRegistered] = useState<boolean>();
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    window.electron.isAuthed().then(setIsAuthed);
    window.electron.isRegistered().then(setIsRegistered);
  }, []);

  window.electron.onAuthChange((_, isAuthed) => setIsAuthed(isAuthed));
  window.electron.onRegistrationChange((_, isRegistered) => setIsRegistered(isRegistered));

  if (!isRegistered) {
    return <Register />;
  }

  if (!isAuthed) {
    return <Login />;
  }

  return (
    isAuthed && (
      <div className="app-wrapper">
        <Sidebar onClick={setSelectedChat} />
        {selectedChat ? (
          <Chat chat={selectedChat} />
        ) : (
          <div className="hello-there">
            <div>
              <Safe />
              <h1>Secure</h1>
              <p>E2E encrypted messages using the Signal Protocol</p>
            </div>
            <div>
              <Rocket />
              <h1>Fast</h1>
              <p>Using fast and decentralized XMPP communication</p>
            </div>
            <div>
              <Phone />
              <h1>Intuitive</h1>
              <p>Familar design language we all expect for messaging</p>
            </div>
          </div>
        )}
      </div>
    )
  );
}
