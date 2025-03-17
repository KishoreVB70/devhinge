import SideBar from "@/components/SideBar";
import { getUserSelf } from "@/lib/dbhelpers/dbhelpers";

export default async function SideBarWrapper({ demo }: { demo?: boolean }) {
  let user;
  if (!demo) {
    user = await getUserSelf();
  }

  if (!user) {
    user = { name: "John", avatar_url: "/devconnect.webp" };
  }

  return <SideBar user={user} demo={demo} />;
}
