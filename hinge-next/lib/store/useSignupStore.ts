import { zSignupStepOne } from "@/lib/schema/formSchema";
import { z } from "zod";
import { create } from "zustand";

type SignupStepOne = z.infer<typeof zSignupStepOne>;
type SignupState = {
  step: number;
  data: SignupStepOne;
  setFormData: (data: SignupStepOne) => void;
  nextStep: () => void;
};
export const useSignupStore = create<SignupState>((set) => ({
  step: 2,
  data: {
    email: "",
    password: "",
  },
  setFormData: (newData) =>
    set(() => ({
      data: { ...newData },
    })),
  nextStep: () => set(() => ({ step: 2 })),
}));
