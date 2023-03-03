import "../styles/Sidebar.css";
import Profile from "./Profile";

export default function Sidebar({ onClick }: { onClick: (chat: string) => void }) {
  return (
    <div className="sidebar-wrapper">
      <Profile />
      <div className="sidebar-item-separator" />
      <div className="profile add-friend" />
      <div className="profile create-group-chat" />
      <div className="sidebar-item-separator" />
      <div className="profile" onClick={() => onClick("chat 1")} />
      <div className="profile" onClick={() => onClick("chat 2")} />
      <div className="profile" onClick={() => onClick("chat 3")} />
      <div className="profile" onClick={() => onClick("chat 4")} />
      <div className="profile" onClick={() => onClick("chat 5")} />
      <div className="profile" onClick={() => onClick("chat 6")} />
      <div className="profile" onClick={() => onClick("chat 7")} />
      <div className="profile" onClick={() => onClick("chat 8")} />
      <div className="profile" onClick={() => onClick("chat 9")} />
      <div className="profile" onClick={() => onClick("chat 10")} />
    </div>
  );
}
