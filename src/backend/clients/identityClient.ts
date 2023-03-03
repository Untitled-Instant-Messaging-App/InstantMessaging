import axios from "axios";
import { BasicUser, User } from "../../common/types";

export async function register(user: BasicUser): Promise<User> {
  return await axios.post("/register/user", user);
}

export async function unregister(user: User): Promise<void> {
  await axios.delete("/unregister/user/" + user.id);
}
