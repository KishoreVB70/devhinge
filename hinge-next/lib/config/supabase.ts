import { serverEnv } from "@/lib/utils/serverEnv";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = serverEnv.supabaseUrl;
const supabaseAnonKey = serverEnv.supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
