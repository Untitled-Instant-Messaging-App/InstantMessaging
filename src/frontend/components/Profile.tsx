import { useEffect, useState } from "react";
import { User } from "../../common/types";

export default function Profile() {
  const [profile, setProfile] = useState<User>();

  useEffect(() => {
    window.electron.fetchProfile().then(console.log);
  }, []);

  return (
    <div className="profile" onClick={() => window.electron.logout()}>
      {profile?.displayName}
    </div>
  );
}
