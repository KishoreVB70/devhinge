import RadioFormItem from "@/components/forms/auth/signup/RadioFormItem";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { genderOptions } from "@/lib/schema/userSchema";
import React from "react";
import { Control } from "react-hook-form";

type GenderSelectProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
};

function GenderSelect({ control }: GenderSelectProps) {
  return (
    <FormField
      control={control}
      name="gender"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Gender</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {genderOptions.map((item) => (
                <RadioFormItem key={item} value={item} label={item} />
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default GenderSelect;
