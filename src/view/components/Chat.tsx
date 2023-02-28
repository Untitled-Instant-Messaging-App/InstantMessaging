import "../styles/Chat.css";
import Vibrant from "node-vibrant";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Chat() {
  const [palette, setPalette] = useState<any>();

  axios.get("https://lh3.googleusercontent.com/a/AGNmyxaXikum7I7TxMRGpRisQl6tronnAXvKz8zmz5guag=s432").then(res => {
    const buffer = Buffer.from(res.data);
    Vibrant.from(buffer).getPalette().then(setPalette);
  });

  return (
    <div className="chat-wrapper">
      <img className="profile" />
      <div style={{ height: 100, width: 100, color: palette?.Vibrant.rgb() }} />
    </div>
  );
}
