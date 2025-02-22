import "server-only";
import { supabase } from "@/lib/config/supabase";
import { zUserFeedProfiles } from "@/lib/schema/userSchema";

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
