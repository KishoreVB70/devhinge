import { clientEnv } from "@/lib/utils/clientEnv";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = clientEnv.supabaseUrl;
const supabaseAnonKey = clientEnv.supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
