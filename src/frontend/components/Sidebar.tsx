import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar-wrapper">
      <div className="profile" onClick={() => window.electron.logout()} />
      <div className="sidebar-item-separator" />
      <div className="profile add-friend" />
      <div className="profile create-group-chat" />
      <div className="sidebar-item-separator" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
      <div className="profile" />
    </div>
  );
}
