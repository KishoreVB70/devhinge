"use client";
import { Button } from "@/components/ui/button";
import { customSignupAction } from "@/lib/actions/signupAction";
import React, { useActionState } from "react";

function Signup() {
  const [error, dispatch, isPending] = useActionState(customSignupAction, "");
  // Required information for signup:
  // 1) Email
  // 2) Password

  // 3) Username
  // 4) Age

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form action={dispatch}>
        <label htmlFor="email">Email:</label>
        <input
          className="border border-black"
          type="email"
          id="email"
          name="email"
          required
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "loading" : "Submit"}
        </Button>
        {error.length > 0 && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Signup;
