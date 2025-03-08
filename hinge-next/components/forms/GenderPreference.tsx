import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { genderOptions } from "@/lib/schema/userSchema";
import React from "react";
import { Control } from "react-hook-form";

type GenderPreferenceProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
};
function GenderPreference({ control }: GenderPreferenceProps) {
  return (
    <FormField
      control={control}
      name="gender_preference"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Select Gender Preferences</FormLabel>
          <FormDescription>
            You must select at least one option.
          </FormDescription>
          <FormControl>
            <div className="flex flex-col space-y-2">
              {genderOptions.map((gender) => (
                <FormItem key={gender} className="flex items-center space-x-3">
                  <Checkbox
                    id={gender}
                    className="mt-2"
                    checked={field.value?.includes(gender)}
                    onCheckedChange={(checked) => {
                      const newValue = checked
                        ? [...field.value, gender]
                        : field.value.filter((item) => item !== gender);
                      field.onChange(newValue);
                    }}
                  />
                  <FormLabel className="mt-2" htmlFor={gender}>
                    {gender}
                  </FormLabel>
                </FormItem>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default GenderPreference;
