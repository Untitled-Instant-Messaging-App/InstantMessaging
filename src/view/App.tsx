import "./styles/App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthState as AuthState } from "../common/types";
import useAuth from "./components/useAuth";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

export default function App() {
  const { state, isAuthed } = useAuth();

  if (state === AuthState.NotRegistered || state === AuthState.Registering) {
    return <Register state={state} />;
  }

  if (!isAuthed) {
    return <Login state={state} />;
  }

  return (
    isAuthed &&
    <div className="app-wrapper">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="chat">
        <Chat />
      </div>
    </div>
  );
}
