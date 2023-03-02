import "../styles/Chat.css";

export default function Chat({ chat }: { chat: string }) {
  return (
    <div className="chat-wrapper">
      <nav className="chat-header">
        <div className="chat-user">
          <div className="chat-user-picture"></div>
          <div className="chat-user-name">@{chat}</div>
        </div>
      </nav>
      <div className="chat-conversation">
        <div style={{ flexDirection: "row-reverse" }} className="chat-item-wrapper">
          <div className="chat-bubble">Hello there!</div>
        </div>
        <div className="chat-item-wrapper">
          <div className="chat-bubble">Hi!</div>
        </div>
        <div className="chat-item-wrapper">
          <div className="chat-bubble">How are you??</div>
        </div>
        <div style={{ flexDirection: "row-reverse" }} className="chat-item-wrapper">
          <div className="chat-bubble">I'm good!</div>
        </div>
      </div>
      <footer className="chat-inputs">
        <input className="text-input" placeholder={`Chat with @${chat}`} />
      </footer>
    </div>
  );
}
