import axios from "axios";

export default async function imageToUrl(image: any): Promise<string> {
  const body = new FormData();
  body.set("key", process.env.REACT_APP_IMGBB_API_KEY);
  body.append("image", image);
  const res = await axios.post(process.env.REACT_APP_IMGBB_BASE_URL, body);
  return res.data.data.display_url;
}
