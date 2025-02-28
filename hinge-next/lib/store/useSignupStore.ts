import { signupInputs } from "@/lib/schema/formSchema";
import { create } from "zustand";

type SignupState = {
  step: number;
  data: signupInputs;
  setFormData: (data: Partial<SignupState["data"]>) => void;
  nextStep: () => void;
};
export const useSignupStore = create<SignupState>((set) => ({
  step: 1,
  data: {
    email: "",
    password: "",
    name: "",
    gender: "",
    preferences: [],
  },
  setFormData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
}));
