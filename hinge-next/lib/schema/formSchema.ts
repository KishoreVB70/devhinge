export const zSignupInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type signupInputs = z.infer<typeof zSignupInput>;
