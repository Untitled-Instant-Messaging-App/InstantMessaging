import "./App.css";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../common/types";
import { useEffect, useState } from "react";

function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isFirstTime, setIsFirstTime] = useState();

  function onClick(data: LoginCredentials) {
    window.electron.register(data);
  }
  
  window.electron.handleFirstTime((event, value) => {
    console.log("is first time running app: ", value);
    event.sender.send("test", "Got the memo");
  });
  
  return (
    <form onSubmit={handleSubmit(onClick)}>
      <>
        <input type="text" placeholder="Enter a username" {...register("username", { required: true, maxLength: 20 })} />
        {errors.username?.type === "required" && <p role="alert">Username is required</p>}
        {errors.username?.type === "maxLength" && <p role="alert">Username must cannot be longer than 20 chars</p>}
        <input type="text" placeholder="Enter a password" {...register("password", { required: true, minLength: 10 })} />
        {errors.password && <p role="alert">Password is required and must be 20 chars long</p>}
        <input type="submit" value="Register" />
      </>
    </form>
  );
}

export default App;
