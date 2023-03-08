import axios from "axios";
import { BasicUser, User } from "../../common/types";
import https from "https";
import isDev from "electron-is-dev";

export async function register(user: BasicUser): Promise<User> {
  const res = await axios.post("https://localhost:44354" + "/users/register", user, headers());
  return res.data;
}

export async function unregister(user: User): Promise<void> {
  await axios.delete("https://localhost:44354" + "/users/unregister/" + user.id);
}

function headers() {
  return isDev ? { httpsAgent: new https.Agent({ rejectUnauthorized: false }) } : null;
}
