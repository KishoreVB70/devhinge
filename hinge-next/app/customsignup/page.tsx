"use client";
import { Button } from "@/components/ui/button";
import { customSignupAction } from "@/lib/actions/signupAction";
import { signupInputs, zSignupInput } from "@/lib/schema/formSchema";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<signupInputs>({
    resolver: zodResolver(zSignupInput),
  });
  // Required information for signup:
  // 1) Email
  // 2) Password

  // 3) Username
  // 4) Age

  const onsubmit: SubmitHandler<signupInputs> = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const error = await customSignupAction(data);
    if (error) {
      setError("root", { message: error });
    } else {
      reset();
    }
  };

  return (
    <div className="flex flex-row items-center justify-center h-screen">
      <form onSubmit={handleSubmit(onsubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className="border border-black"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-700">{errors.email.message}</p>
          )}
        </div>
        <div className="mt-3">
          <label htmlFor="password">Password:</label>
          <input
            className="border border-black"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-700">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "loading" : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default Signup;
