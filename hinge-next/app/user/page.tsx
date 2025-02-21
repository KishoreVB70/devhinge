import { getUser } from "@/lib/utils/dbhelpers";
import React from "react";

async function User() {
  const user = await getUser();
  console.log(user);
  return <div>User</div>;
}

export default User;
