import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UpdatableUser } from "@/lib/schema/userSchema";
import React from "react";
import { Control } from "react-hook-form";

type InputProps = {
  control: Control<UpdatableUser>;
  length: number;
  maxLength: number;
  label: string;
  name: keyof UpdatableUser;
};

function InputWithLimit({
  maxLength,
  control,
  length,
  label,
  name,
}: InputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const isHigher = length > maxLength;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <p
              className={`absolute right-2 top-3 text-sm transition-opacity ${
                isFocused ? "opacity-100" : "opacity-0"
              } ${isHigher ? "text-red-500" : "text-gray-500"}
            `}
            >
              {length}/{maxLength}
            </p>
            <FormControl>
              <Textarea
                className="pr-14"
                {...field}
                value={field.value ?? ""}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default InputWithLimit;
