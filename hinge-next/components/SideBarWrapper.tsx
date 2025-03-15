import SideBar from "@/components/SideBar";
import { getUserSelf } from "@/lib/dbhelpers/dbhelpers";

export default async function SideBarWrapper() {
  let user = await getUserSelf();

  if (!user) {
    user = { name: "prius", avatar_url: "/devconnect.webp" };
  }

  return <SideBar user={user} />;
}
