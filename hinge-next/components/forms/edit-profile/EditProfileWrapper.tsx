"use client";
import toast, { Toaster } from "react-hot-toast";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputWithLimit from "@/components/forms/edit-profile/InputWithLimit";
import {
  genderOptions,
  UpdatableUser,
  zUpdatableUser,
} from "@/lib/schema/userSchema";
import { Input } from "@/components/ui/input";
import GenderSelect from "@/components/forms/GenderSelect";
import ProfileImageUploadForm from "@/components/forms/auth/signup/ProfileImageUpload";
import { Button } from "@/components/ui/button";
import MultiItemsInput from "@/components/forms/edit-profile/MultiItemsInputWrapper";
import updateUser from "@/lib/actions/updateUserAction";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDemoStore } from "@/lib/store/useDemoStore";

type EditProfileProps = {
  user: UpdatableUser;
};

export default function EditProfileForm({ user }: EditProfileProps) {
  const { isDemo } = useDemoStore();
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
    resolver: zodResolver(zUpdatableUser),
    defaultValues: {
      bio: user.bio || "",
      website_url: user.website_url || "",
      age: user.age || 0,
      experience_years: user.experience_years || 0,
      gender: user.gender,
      gender_preference: user.gender_preference,
      hobbies: defaultHobbies,
      skills: defautlSkills,
      avatar_url: user.avatar_url,
    },
  });

  const bio = form.watch("bio");
  const website_url = form.watch("website_url");
  const hobbies = form.watch("hobbies");
  const skills = form.watch("skills");

  async function onSubmit(data: UpdatableUser) {
    if (isDemo) {
      return;
    }

    if (data.website_url === "") {
      delete data.website_url;
    }
    console.log(data);

    data.hobbies = data.hobbies?.filter((hobby) => hobby !== "");
    data.skills = data.skills?.filter((skill) => skill !== "");
    try {
      await updateUser(data);
      toast("Profile updated successfully");
    } catch (error) {
      console.error(error);
      form.setError("root", {
        message: "Something went wrong, please try again",
      });
    }
  }

  return (
    <div className="w-full pb-[30%] lg:pb-[10%] lg:w-9/12 max-w-[700px] lg:h-full custom-scrollbar overflow-y-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center p-10 space-y-4"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>

          {/* Image */}
          <ProfileImageUploadForm control={form.control} />

          {/* Bio */}
          <InputWithLimit
            maxLength={MAX_BIO_LENGTH}
            control={form.control}
            length={bio?.length || 0}
            label="Bio"
            name="bio"
          />

          {/* Age */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="max-w-[100px]"
                    type="number"
                    max={100}
                    min={10}
                  />
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
                    className="max-w-[100px]"
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
          <FormField
            control={form.control}
            name="gender_preference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender Preferences</FormLabel>
                <FormDescription>
                  You must select at least one option.
                </FormDescription>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    {genderOptions.map((gender) => (
                      <FormItem
                        key={gender}
                        className="flex items-center space-x-3"
                      >
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

          {/* Website */}
          <InputWithLimit
            maxLength={MAX_WEBSITE_LENGTH}
            control={form.control}
            length={website_url?.length || 0}
            label="Website url"
            name="website_url"
          />

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
          <Button
            type="submit"
            className="mx-auto w-full max-w-[300px]"
            disabled={form.formState.isLoading}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Save"}
          </Button>
        </form>
      </Form>
      <Toaster />
    </div>
  );
}
