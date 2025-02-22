import "server-only";
import { supabase } from "@/lib/config/supabase";
import { zUserFeedProfiles } from "@/lib/schema/userSchema";
import { headers } from "next/headers";
import { zInterestedProfiles } from "@/lib/schema/connectionSchema";

export const getFeedProfiles = async () => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("avatar_url, name, id");
    if (error) {
      throw new Error(error.message);
    }
    const validatedData = zUserFeedProfiles.parse(data);
    return validatedData;
  } catch (error) {
    console.error(error);
  }
};

export const getInterestedProfiles = async () => {
  try {
    const header = await headers();
    const userId = header.get("id");
    if (!userId) {
      throw new Error("User ID not found");
    }

    const { data, error } = await supabase
      .from("connections")
      .select(
        `
          id,
          sender_profile:sender_id (id, name, avatar_url)
        `
      )
      .eq("target_id", userId)
      .eq("status", "interested");

    if (error) {
      throw new Error(error.message);
    }

    // Validate the data
    const validatedData = zInterestedProfiles.parse(data);
    console.log(validatedData);
    if (validatedData.length === 0) {
      return null;
    }
    return validatedData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUser = async () => {
  try {
    const { data, error } = await supabase.from("users").select();
    if (error) {
      throw new Error(error.message);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
