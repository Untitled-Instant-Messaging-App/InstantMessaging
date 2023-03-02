import axios from "axios";
import { BasicUser, User } from "../../common/types";

export default class IdentityClient {
  public async register(user: BasicUser): Promise<User> {
    return await axios.post("/register/user", user);
  }

  public async unregister(user: User): Promise<void> {
    await axios.delete("/unregister/user/" + user.id);
  }
}
