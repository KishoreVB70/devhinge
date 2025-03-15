"use client";
import React from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PasswordInput({ control }: { control: any }) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input {...field} type={showPassword ? "text" : "password"} />
          </FormControl>
          {/* Toggle Button */}
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-gray-500" />
            ) : (
              <Eye className="w-5 h-5 text-gray-500" />
            )}
          </button>
          <FormDescription>Password must contain 8 characters</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default PasswordInput;
