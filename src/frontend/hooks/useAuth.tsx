import { useState } from "react";
import { AuthState } from "../../common/types";

export default function useAuth() {
  const [state, setState] = useState<AuthState>();
  window.electron.authState((_, state) => setState(state));
  console.log(AuthState[state]);
  return { state, isAuthed: state === AuthState.SignedIn };
}
