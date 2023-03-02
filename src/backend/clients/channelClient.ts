import axios from "axios";

export default class ChannelClient {
  public getChannels(user: string) {
    return axios.get("/channels/" + user);
  }

  public getMessages(user: string, contact: string, offset: number, count: number) {
    return axios.get("/channels/" + user);
  }
}
