import "./styles/App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthState as AuthState } from "../common/types";
import useAuth from "./components/useAuth";

export default function App() {
  const { state, isAuthed } = useAuth();

  if (state === AuthState.NotRegistered || state === AuthState.Registering) {
    return <Register state={state} />;
  }

  if (!isAuthed) {
    return <Login state={state} />;
  }

  // return state === AuthState.LoggedIn && <div>Logged in</div>;
}
