import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MAX_HOBBY_LENGTH } from "@/lib/constants";
import { UpdatableUser } from "@/lib/schema/userSchema";
import React from "react";
import { Control } from "react-hook-form";

type MultiItemsInputProps = {
  control: Control<UpdatableUser>;
  label: string;
  name: "skills" | "hobbies";
  items: number;
};

export default function MultiItemsInput({
  items,
  label,
  control,
  name,
}: MultiItemsInputProps) {
  const placeHolder = name === "skills" ? "Skill" : "Hobby";
  return (
    <>
      <Label>{label}</Label>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: items }).map((_, i) => (
          <FormField
            key={i}
            control={control}
            name={`${name}.${i}`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={`${placeHolder} ${i + 1}`}
                    maxLength={MAX_HOBBY_LENGTH}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </>
  );
}
