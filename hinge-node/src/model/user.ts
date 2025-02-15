import { zodSchema } from "@zodyac/zod-mongoose";
import { model } from "mongoose";
import { z } from "zod";
import { extendZod } from "@zodyac/zod-mongoose";

extendZod(z);

export const zUser = z.object({
  name: z.string().min(3).max(18),
  email: z.string().email().unique(),
  image: z.string().url(),
  password: z.string().min(6).max(18),
});

const userSchema = zodSchema(zUser);
export const User = model("User", userSchema);
