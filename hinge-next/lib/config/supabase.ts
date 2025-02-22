import "server-only";
import serverEnv from "@/lib/utils/serverEnv";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = serverEnv.supabaseUrl;
const serviceRoleKey = serverEnv.supabaseServiceRoleKey;

export const supabase = createClient(supabaseUrl, serviceRoleKey);
