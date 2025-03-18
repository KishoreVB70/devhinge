import SideBar from "@/components/SideBar";
import { getUserSelf } from "@/lib/dbhelpers/dbhelpers";
import { headers } from "next/headers";

export default async function SideBarWrapper() {
  const pathHeaders = await headers();
  const isDemo = Boolean(pathHeaders.get("x-isdemo"));
  let user;
  if (!isDemo) {
    user = await getUserSelf();
  }

  if (!user) {
    user = { name: "John", avatar_url: "/devconnect.webp" };
  }

  return <SideBar user={user} isDemo={isDemo} />;
}
