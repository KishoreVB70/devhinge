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
import GenderPreference from "@/components/forms/GenderPreference";

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

  const onsubmit: SubmitHandler<SignupStepTwo> = async (stepTwoData) => {
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
        className="flex flex-col gap-6 min-w-[500px]"
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
                <Input placeholder="John" {...field} />
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
        <GenderPreference control={form.control} />
        <ProfileImageUploadForm control={form.control} />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "loading" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
