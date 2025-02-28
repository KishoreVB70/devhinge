"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import signupAction from "@/lib/actions/signupAction";
import { CustomSigunpInput, zCustomSigunpInput } from "@/lib/schema/formSchema";
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
import { RadioGroup } from "@/components/ui/radio-group";
import { zGender } from "@/lib/schema/userSchema";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import RadioFormItem from "@/components/auth/signup/RadioFormItem";

const genderOptions = Object.values(zGender.Values);

export default function SignupForm() {
  const form = useForm<CustomSigunpInput>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      age: 10,
      gender: "male",
      gender_preference: [],
    },
    resolver: zodResolver(zCustomSigunpInput),
  });

  const onsubmit: SubmitHandler<CustomSigunpInput> = async (data) => {
    await signupAction(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="flex flex-col gap-6 min-w-[500px]"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Sign Up a new account</h1>
        </div>
        {/* Username */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Johndoe@email.com" {...field} />
              </FormControl>
              <FormDescription>
                Your email will be used to login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Password must contain 8 characters
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
        <FormField
          control={form.control}
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
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "loading" : "Submit"}
        </Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline underline-offset-4">
            Log in
          </Link>
        </div>
      </form>
    </Form>
  );
}
