import axios from "axios";
import { BasicUser, User } from "../../common/types";

export async function register(user: BasicUser): Promise<User> {
  return await axios.post("https://localhost:44354" + "/users/register", user);
}

export async function unregister(user: User): Promise<void> {
  await axios.delete("https://localhost:44354" + "/users/unregister/" + user.id);
}
