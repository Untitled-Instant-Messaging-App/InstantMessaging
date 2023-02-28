import { useState } from "react";
import "./styles/App.css";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [isFirstTime, setIsFirstTime] = useState<boolean>();
  window.electron.isFirstTimeRunning((_, value) => setIsFirstTime(value));

  return <Register />
  return isFirstTime ? <Register /> : <Login />;
}
