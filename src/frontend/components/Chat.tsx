import { useState, useRef, useEffect } from "react";
import "../styles/Chat.css";
import Vibrant from "node-vibrant";
import { Message } from "../../common/types";

export default function Chat({ chat }: { chat: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [palette, setPalette] = useState(null);
  const bottom = useRef(null);

  // useEffect(() => {
  //   Vibrant.from(image).getPalette().then(setPalette).catch();
  // }, []);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(event: any): void {
    if (event.key == "Enter") {
      if (event.target.value) {
        const newMessage: Message = {
          id: new Date().toISOString(),
          sender: "you",
          receiver: "",
          content: event.target.value,
          timestamp: new Date(),
        };

        setMessages([...messages, newMessage]);
      }

      event.target.value = "";
      // event.target.blur();
    }
  }

  return (
    <div className="chat-wrapper">
      <nav className="chat-header">
        <div className="chat-user">
          <img className="chat-user-picture" />
          <div className="chat-user-name">@{chat}</div>
        </div>
      </nav>
      <div className="chat-conversation">
        {messages.map(m => (
          <div key={m.id} style={{ flexDirection: m.sender === "you" ? "row-reverse" : "row" }} className="chat-item-wrapper">
            <div className="chat-bubble">
              {/* <div style={{ color: m.sender !== "you" ? palette?.LightVibrant.hex : "inherit",  }} className="chat-bubble"> */}
              {m.content}
            </div>
          </div>
        ))}
        <div ref={bottom} />
      </div>
      <footer className="chat-inputs">
        <input className="text-input" placeholder={`Chat with @${chat}`} onKeyDown={sendMessage} />
      </footer>
    </div>
  );
}
