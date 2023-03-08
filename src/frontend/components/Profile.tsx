import { useEffect, useState } from "react";
import { User } from "../../common/types";

export default function Profile() {
  const [profile, setProfile] = useState<User>();

  useEffect(() => {
    window.electron.fetchProfile().then(setProfile);
  }, []);

  return <img className="profile" src={profile?.image} />;
}
