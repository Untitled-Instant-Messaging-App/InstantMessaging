import "./App.css";
import { useRef } from "react";
import { channels } from "../shared/constants";
import { ipcRenderer } from "electron";

function App() {
  const password = useRef();
  const username = useRef();

  function handleLogin() {
    ipcRenderer.send(channels.REGISTER, { username: username.current, password: password.current });
  }

  return (
    <div>
      <input type="text" ref={password} placeholder="a username" />
      <input type="text" ref={username} placeholder="a password" />
      <input type="button" value="Register" onClick={handleLogin} />
    </div>
  );
}

export default App;
