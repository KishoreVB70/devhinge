import { SignInForm } from "@/components/auth/login-form";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-row h-screen w-full items-center justify-center">
      <SignInForm />
    </div>
  );
};

export default LoginPage;
