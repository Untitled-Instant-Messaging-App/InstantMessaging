import "./styles/App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthState as AuthState } from "../common/types";
import useAuth from "./hooks/useAuth";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useState } from "react";

export default function App() {
  const { state, isAuthed } = useAuth();
  const [selectedChat, setSelectedChat] = useState("Initial state");

  // if (state === AuthState.NotRegistered || state === AuthState.Registering) {
  //   return <Register state={state} />;
  // }

  // if (!isAuthed) {
  //   return <Login state={state} />;
  // }

  return (
    // isAuthed &&
    <div className="app-wrapper">
      <Sidebar onClick={setSelectedChat} />
      <Chat chat={selectedChat} />
    </div>
  );
}
