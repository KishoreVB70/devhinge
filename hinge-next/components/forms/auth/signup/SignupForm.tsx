"use client";

import StepOneSignup from "@/components/forms/auth/signup/StepOneSignup";
import StepTwoSignup from "@/components/forms/auth/signup/StepTwoSignup";
import { useSignupStore } from "@/lib/store/useSignupStore";

export default function SignUpFormWrapper() {
  const { step } = useSignupStore();

  if (step === 1) {
    return <StepOneSignup />;
  } else {
    return <StepTwoSignup />;
  }
}
