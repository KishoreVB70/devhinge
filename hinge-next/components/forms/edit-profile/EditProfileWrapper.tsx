"use client";

import React from "react";
import { MAX_BIO_LENGTH, MAX_WEBSITE_LENGTH } from "@/lib/constants";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputWithLimit from "@/components/forms/edit-profile/InputWithLimit";
import { UpdatableUser } from "@/lib/schema/userSchema";
import { Input } from "@/components/ui/input";
import GenderSelect from "@/components/forms/GenderSelect";
import GenderPreference from "@/components/forms/GenderPreference";

type EditProfileProps = {
  user: UpdatableUser;
};

export default function EditProfileForm({ user }: EditProfileProps) {
  const form = useForm<UpdatableUser>({
    defaultValues: {
      bio: user.bio || "",
      website: user.website || "",
      age: user.age || 0,
      experience_years: user.experience_years || 0,
      gender: user.gender,
      gender_preference: user.gender_preference,
    },
  });

  const bio = form.watch("bio");
  const website = form.watch("website");

  async function onSubmit(data: UpdatableUser) {
    console.log(data);
  }
  return (
    <div className="w-3/12 flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Bio */}
          <InputWithLimit
            maxLength={MAX_BIO_LENGTH}
            control={form.control}
            length={bio?.length || 0}
            label="Bio"
            name="bio"
          />
          {/* Website */}
          <InputWithLimit
            maxLength={MAX_WEBSITE_LENGTH}
            control={form.control}
            length={website?.length || 0}
            label="Website"
            name="website"
          />
          {/* Age */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input {...field} type="number" max={100} min={10} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Experience */}
          <FormField
            control={form.control}
            name="experience_years"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? 0}
                    type="number"
                    max={50}
                    min={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Gender */}
          <GenderSelect control={form.control} />

          {/* Gender Preference */}
          <GenderPreference control={form.control} />
        </form>
      </Form>
    </div>
  );
}
