import { LoginCredentials } from "src/shared/types";

declare global {
  interface Window {
    electron: {
      register: (credentials: LoginCredentials) => void;
    };
  }
}
export {};
