import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MAX_HOBBY_LENGTH } from "@/lib/constants";
import { UpdatableUser } from "@/lib/schema/userSchema";
import React, { useState } from "react";
import { Control } from "react-hook-form";

type MultiItemInputProps = {
  control: Control<UpdatableUser>;
  i: number;
  name: "skills" | "hobbies";
  length: number;
};

function MultiItemInput({ i, name, length, control }: MultiItemInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isHigher = length > MAX_HOBBY_LENGTH;
  const placeHolder = name === "skills" ? "Skill" : "Hobby";

  return (
    <FormField
      control={control}
      name={`${name}.${i}`}
      render={({ field }) => (
        <FormItem>
          <div className="relative">
            <p
              className={`absolute right-2 top-3 text-sm transition-opacity ${
                isFocused ? "opacity-100" : "opacity-0"
              } ${isHigher ? "text-red-500" : "text-gray-500"}
            `}
            >
              {length}/{MAX_HOBBY_LENGTH}
            </p>
            <FormControl>
              <Input
                {...field}
                placeholder={`${placeHolder} ${i + 1}`}
                maxLength={MAX_HOBBY_LENGTH}
                type="text"
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

export default MultiItemInput;
