import { useForm } from "react-hook-form";
import { AuthState, LoginCredentials } from "../../common/types";
import "../styles/Register.css";

export default function Register({ state }: { state: AuthState }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function onClick(data: LoginCredentials) {
    window.electron.register(data);
  }

  return (
    <div className="registration-wrapper" style={state === AuthState.Registering ? { opacity: 0.5, pointerEvents: "none" } : null}>
      <div>
        <h1>Registration</h1>
        <span>Looks like this is the first time you are running this app. Register a user and begin chating!</span>
      </div>
      <form className="registration-form" onSubmit={handleSubmit(onClick)}>
        {errors.username?.type === "required" && <p className="validation-error">Username is required</p>}
        {errors.username?.type === "maxLength" && <p className="validation-error">Username must cannot be longer than 20 characters</p>}
        <input type="text" placeholder="Enter a username" {...register("username", { required: true, maxLength: 20 })} />
        {errors.password?.type === "required" && <p className="validation-error">Password is required</p>}
        {errors.password?.type === "minLength" && <p className="validation-error">Password must be at least 10 characters long</p>}
        <input type="text" placeholder="Enter a password" {...register("password", { required: true, minLength: 10 })} />
        <input type="submit" value="Register" />
      </form>
      <div className="registration-note">Please note that a user is tied to a device. Upon registration, your credentials will only be valid on this device.</div>
    </div>
  );
}
