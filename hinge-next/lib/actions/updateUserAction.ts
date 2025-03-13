"use server";
import { headers } from "next/headers";
import { UpdatableUser, zUpdatableUser } from "@/lib/schema/userSchema";
import { supabase } from "@/lib/config/supabase";

export default async function updateUser(rawData: UpdatableUser) {
  const headersList = await headers();
  const id = headersList.get("id");
  if (!id) {
    throw new Error("No token found");
  }
  const userData = zUpdatableUser.parse(rawData);

  const { data, error } = await supabase
    .from("users")
    .update(userData)
    .eq("id", id)
    .select("id")
    .single();
  if (error) throw error;
  if (!data) {
    throw new Error("User not found");
  }
}
