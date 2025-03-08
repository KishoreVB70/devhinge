"use client";

import React from "react";
import {
  MAX_BIO_LENGTH,
  MAX_HOBBIES,
  MAX_WEBSITE_LENGTH,
} from "@/lib/constants";
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
import ProfileImageUploadForm from "@/components/forms/auth/signup/ProfileImageUpload";
import { Button } from "@/components/ui/button";
import MultiItemsInput from "@/components/forms/edit-profile/MultiItemsInputWrapper";
import updateUser from "@/lib/actions/updateUserAction";

type EditProfileProps = {
  user: UpdatableUser;
};

export default function EditProfileForm({ user }: EditProfileProps) {
  let defaultHobbies = [];
  if (user.hobbies) {
    defaultHobbies = [
      ...user.hobbies,
      ...Array(MAX_HOBBIES - user.hobbies.length).fill(""),
    ];
  } else {
    defaultHobbies = Array(MAX_HOBBIES).fill("");
  }

  let defautlSkills = [];
  if (user.skills) {
    defautlSkills = [
      ...user.skills,
      ...Array(MAX_HOBBIES - user.skills.length).fill(""),
    ];
  } else {
    defautlSkills = Array(MAX_HOBBIES).fill("");
  }

  const form = useForm<UpdatableUser>({
    defaultValues: {
      bio: user.bio || "",
      website: user.website || "",
      age: user.age || 0,
      experience_years: user.experience_years || 0,
      gender: user.gender,
      gender_preference: user.gender_preference,
      hobbies: defaultHobbies,
      skills: defautlSkills,
      avatar_url: user.avatar_url,
    },
  });

  console.log(user);

  const bio = form.watch("bio");
  const website = form.watch("website");
  const hobbies = form.watch("hobbies");
  const skills = form.watch("skills");

  async function onSubmit(data: UpdatableUser) {
    if (data.website === "") {
      delete data.website;
    }
    console.log(data);

    data.hobbies = data.hobbies?.filter((hobby) => hobby !== "");
    data.skills = data.skills?.filter((skill) => skill !== "");
    try {
      await updateUser(data);
    } catch (error) {
      console.error(error);
      form.setError("root", {
        message: "Something went wrong, please try again",
      });
    }
  }
  return (
    <div className="w-3/12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center p-10 space-y-4"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Edit your profile</h1>
          </div>
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

          {/* Image */}
          <ProfileImageUploadForm control={form.control} />

          {/* Hobbies */}
          <MultiItemsInput
            name="hobbies"
            label="Hobbies"
            control={form.control}
            values={hobbies}
          />

          {/* Skills */}
          <MultiItemsInput
            name="skills"
            label="Skills"
            control={form.control}
            values={skills}
          />

          {form.formState.errors.root && (
            <p className="text-red-500">{form.formState.errors.root.message}</p>
          )}
          <Button type="submit" disabled={form.formState.isLoading}>
            {form.formState.isLoading ? "Loading..." : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
