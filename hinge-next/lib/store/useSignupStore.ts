import { SignUpInput } from "@/lib/schema/formSchema";
import { create } from "zustand";

type SignupState = {
  step: number;
  data: SignUpInput;
  setFormData: (data: Partial<SignupState["data"]>) => void;
  nextStep: () => void;
};
export const useSignupStore = create<SignupState>((set) => ({
  step: 1,
  data: {
    email: "",
    password: "",
    age: 0,
    name: "",
    gender: "male",
    gender_preference: [],
  },
  setFormData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
}));
