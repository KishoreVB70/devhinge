import React from "react";
import { Button } from "@/components/ui/button";
import { zSignupStepOne } from "@/lib/schema/formSchema";
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
import Link from "next/link";
import { z } from "zod";
import { useSignupStore } from "@/lib/store/useSignupStore";
import axios from "axios";
import PasswordInput from "@/components/forms/PasswordInput";

type SignupStepOne = z.infer<typeof zSignupStepOne>;
export default function StepOneSignup() {
  const { nextStep, setFormData } = useSignupStore();

  const form = useForm<SignupStepOne>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(zSignupStepOne),
  });

  const checkIfEmailExists = async (email: string) => {
    const response = await axios.get(`/api/unique-username`, {
      data: email,
    });
    if (response.status === 400) {
      form.setError("email", { message: "Email already exists" });
    }
  };

  const onsubmit: SubmitHandler<SignupStepOne> = async (data) => {
    // TODO: Validate if user already exists
    const response = await axios.get(`/api/unique-email/${data.email}`);
    if (response.status === 400) {
      form.setError("email", { message: "User already exists" });
      return;
    }
    setFormData(data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="flex flex-col gap-6 w-full max-w-[300px]"
      >
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold">Create a new account</h1>
        </div>
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Johndoe@email.com"
                  {...field}
                  onBlur={(e) => checkIfEmailExists(e.target.value)}
                />
              </FormControl>
              <FormDescription>
                Your email will be used to login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password */}
        <PasswordInput control={form.control} />
        <Button
          className="w-full max-w-[200px] mx-auto "
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "loading" : "Submit"}
        </Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="underline underline-offset-4">
            Log in
          </Link>
        </div>
      </form>
    </Form>
  );
}
