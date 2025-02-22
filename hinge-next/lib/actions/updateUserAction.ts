"use server";
import "server-only";
import { headers } from "next/headers";
import { zUser } from "@/lib/schema/userSchema";
import { supabase } from "@/lib/config/supabase";

export default async function updateUser(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const userData = zUser.parse(rawData);
  const headersList = await headers();
  const id = headersList.get("id");

  if (!id) {
    throw new Error("No token found");
  }

  console.log("id", id);
  const { data, error } = await supabase
    .from("users")
    .update(userData)
    .eq("id", id)
    .select();
  if (error) throw error;
  if (data.length === 0) {
    throw new Error("User not found");
  }
}
