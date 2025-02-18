import { supabase } from "@/lib/config/supabase";
import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";

const AuthUI = () => (
  <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
);

export default AuthUI;
