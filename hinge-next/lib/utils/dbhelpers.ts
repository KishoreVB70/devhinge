import "server-only";
import { supabase } from "@/lib/config/supabase";

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
