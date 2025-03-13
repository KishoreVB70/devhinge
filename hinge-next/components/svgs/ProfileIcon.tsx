import { User } from "lucide-react";

type ProfileIconProps = {
  selected: boolean;
};

function ProfileIcon({ selected }: ProfileIconProps) {
  return <User className={selected ? "text-red-500" : "text-red"} />;
}

export default ProfileIcon;
