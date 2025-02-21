"use server";
import "server-only";
import { headers } from "next/headers";
import { zUser } from "@/lib/schema/userSchema";
import { supabase } from "@/lib/config/supabase";
export default async function updateUser(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const userData = zUser.parse(rawData);
  console.log(userData);
  const headersList = await headers();
  const id = headersList.get("id");

  if (!id) {
    throw new Error("No token found");
  }

  console.log("User data", userData);
  const { error } = await supabase.from("users").update(userData).eq("id", id);
  if (error) throw error;
}
