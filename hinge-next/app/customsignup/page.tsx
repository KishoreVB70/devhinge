"use client";
import { Button } from "@/components/ui/button";
import { customSignupAction } from "@/lib/actions/signupAction";
import { CustomSigunpInput, zCustomSigunpInput } from "@/lib/schema/formSchema";
import React from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zGender } from "@/lib/schema/userSchema";

const genderOptions = Object.values(zGender.Values);
function RadioFormItem({ value, label }: { value: string; label: string }) {
  return (
    <FormItem className="flex items-center space-x-3 space-y-0">
      <FormControl>
        <RadioGroupItem value={value} />
      </FormControl>
      <FormLabel className="font-normal">{label}</FormLabel>
    </FormItem>
  );
}

function Signup() {
  const form = useForm<CustomSigunpInput>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      age: 10,
      gender: "male",
    },
    resolver: zodResolver(zCustomSigunpInput),
  });

  const onsubmit: SubmitHandler<CustomSigunpInput> = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const error = await customSignupAction(data);
    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className=" min-w-[500px] space-y-2"
        >
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
                <FormDescription>
                  Minium age to use the app is 10
                </FormDescription>
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
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "loading" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Signup;
