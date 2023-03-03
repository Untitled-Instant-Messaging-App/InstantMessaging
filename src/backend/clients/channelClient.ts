import axios from "axios";

export function getChannels(user: string) {
  return axios.get("/channels/" + user);
}

export function getMessages(user: string, contact: string, offset: number, count: number) {
  return axios.get("/channels/" + user);
}
