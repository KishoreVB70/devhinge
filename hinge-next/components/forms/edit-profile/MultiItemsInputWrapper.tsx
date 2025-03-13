import MultiItemInput from "@/components/forms/edit-profile/MultiItemInput";
import { Label } from "@/components/ui/label";
import { MAX_HOBBIES } from "@/lib/constants";
import { UpdatableUser } from "@/lib/schema/userSchema";
import React from "react";
import { Control } from "react-hook-form";

type MultiItemsInputWrapperProps = {
  control: Control<UpdatableUser>;
  label: string;
  name: "skills" | "hobbies";
  values: string[] | null | undefined;
};

export default function MultiItemsInputWrapper({
  label,
  control,
  name,
  values,
}: MultiItemsInputWrapperProps) {
  return (
    <>
      <Label>{label}</Label>
      <div className="flex flex-col space-y-3 lg:grid lg:grid-cols-3 lg:gap-2">
        {Array.from({ length: MAX_HOBBIES }).map((_, i) => (
          <MultiItemInput
            key={`${name}${i}`}
            i={i}
            length={values?.[i].length || 0}
            name={name}
            control={control}
          />
        ))}
      </div>
    </>
  );
}
