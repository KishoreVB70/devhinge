import "server-only";
import { supabase } from "@/lib/config/supabase";
import { zUserFeedProfiles } from "@/lib/schema/userSchema";
import { headers } from "next/headers";
import { zInterestedProfiles } from "@/lib/schema/connectionSchema";
import { z } from "zod";

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
    if (validatedData.length === 0) {
      return null;
    }
    return validatedData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const zConnectionData = z.object({
  id: z.preprocess((val) => String(val), z.string()),
  sender_profile: z.object({
    id: z.preprocess((val) => String(val), z.string()),
    name: z.string(),
    avatar_url: z.string(),
  }),
  target_profile: z.object({
    id: z.preprocess((val) => String(val), z.string()),
    name: z.string(),
    avatar_url: z.string(),
  }),
});

export const getConnectedProfiles = async () => {
  try {
    const header = await headers();
    const userId = header.get("id");
    if (!userId) {
      throw new Error("User ID not found");
    }

    // TODO: ensure supabase won't return an array -> cause breaking changes
    const { data, error } = await supabase
      .from("connections")
      .select(
        `
          id,
          sender_profile:sender_id (id, name, avatar_url),
          target_profile:target_id (id, name, avatar_url)
        `
      )
      .or(`sender_id.eq.${userId},target_id.eq.${userId}`)
      .eq("status", "accepted");

    if (error) {
      throw new Error(error.message);
    }

    if (data.length === 0) {
      return [];
    }

    const typedData = zConnectionData.array().parse(data);

    const cleansedData = typedData.map((item) => {
      return {
        id: item.id,
        profile:
          item.sender_profile.id === userId
            ? item.target_profile
            : item.sender_profile,
      };
    });
    return cleansedData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUser = async () => {
  try {
    const { data, error } = await supabase.from("users").select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};
