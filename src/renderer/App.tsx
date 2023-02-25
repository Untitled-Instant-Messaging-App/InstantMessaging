import "./App.css";
import { useRef } from "react";

function App() {
  const password = useRef(null);
  const username = useRef(null);

  function handleLogin() {
    window.electron.register({ username: username.current.value, password: password.current.value });
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
