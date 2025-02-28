"use client";

import StepOneSignup from "@/components/auth/signup/StepOneSignup";
import StepTwoSignup from "@/components/auth/signup/StepTwoSignup";
import { useSignupStore } from "@/lib/store/useSignupStore";

export default function SignUpFormWrapper() {
  const { step } = useSignupStore();

  if (step === 1) {
    return <StepOneSignup />;
  } else {
    return <StepTwoSignup />;
  }
}
