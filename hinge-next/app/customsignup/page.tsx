"use client";
import { Button } from "@/components/ui/button";
import { customSignupAction } from "@/lib/actions/signupAction";
import { signupInputs, zSignupInput } from "@/lib/schema/formSchema";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<signupInputs>();
  // Required information for signup:
  // 1) Email
  // 2) Password

  // 3) Username
  // 4) Age

  const onsubmit: SubmitHandler<signupInputs> = async (data) => {
    try {
      const validatedData = zSignupInput.parse(data);
      const formData = new FormData();
      formData.append("email", validatedData.email);
      formData.append("password", validatedData.password);
      const error = await customSignupAction(data);
      if (error) {
        setError("root", { message: error });
      } else {
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit(onsubmit)}>
        <label htmlFor="email">Email:</label>
        <input
          className="border border-black"
          {...register("email", { required: true })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="password">Email:</label>
        <input
          className="border border-black"
          {...register("password", { required: true })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "loading" : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default Signup;
