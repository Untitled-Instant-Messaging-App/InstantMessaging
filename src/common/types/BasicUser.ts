import { KeyBundle } from "./Keys";

export interface BasicUser {
  displayName: string;
  image: string;
  keyBundle?: KeyBundle;
}
