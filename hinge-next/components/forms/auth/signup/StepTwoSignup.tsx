import React from "react";
import { Button } from "@/components/ui/button";
import signupAction from "@/lib/actions/signupAction";
import { zSignupStepTwo } from "@/lib/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useSignupStore } from "@/lib/store/useSignupStore";
import ProfileImageUploadForm from "@/components/forms/auth/signup/ProfileImageUpload";
import GenderSelect from "@/components/forms/GenderSelect";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { genderOptions } from "@/lib/schema/userSchema";

type SignupStepTwo = z.infer<typeof zSignupStepTwo>;

export default function StepTwoSignup() {
  const { data: stepOneData } = useSignupStore();
  const form = useForm<SignupStepTwo>({
    defaultValues: {
      name: "",
      age: 10,
      gender: "male",
      gender_preference: [],
    },
    resolver: zodResolver(zSignupStepTwo),
  });

  const checkIfUserNameExists = async (userName: string) => {
    const response = await axios.get(`/api/unique-username`, {
      data: { username: userName },
    });
    if (response.status === 400) {
      form.setError("name", { message: "Username already exists" });
    }
  };

  const onsubmit: SubmitHandler<SignupStepTwo> = async (stepTwoData) => {
    const response = await axios.get(
      `/api/unique-username/${stepTwoData.name}`
    );
    if (response.status === 400) {
      form.setError("name", { message: "Username already exists" });
      return;
    }
    // 1) Upload the image
    const { profileImage, ...leanData } = stepTwoData;
    console.log(profileImage);
    const imageId = Math.floor(Math.random() * 1000);
    const profileImageURL = `https://picsum.photos/id/${imageId}/400/600`;
    // 2) Obtain the image URL and add it to the user data
    const validStepTwoData = {
      ...leanData,
      avatar_url: profileImageURL,
    };

    const signupData = { ...stepOneData, ...validStepTwoData };
    await signupAction(signupData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="flex flex-col gap-6 lg:min-w-[500px] pb-12"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Enter your details</h1>
        </div>
        {/* Username */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="John"
                  {...field}
                  onBlur={(e) => checkIfUserNameExists(e.target.value)}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Age */}
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>Minium age to use the app is 10</FormDescription>
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
              <FormLabel>Select Gender Preferences</FormLabel>
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
        <ProfileImageUploadForm control={form.control} />
        <Button
          className="max-w-[200px] mx-auto w-8/12"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "loading" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
