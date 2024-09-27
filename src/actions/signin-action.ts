"use server";

import { signIn } from "@/config/auth";
import { SignInSchema, signInSchema } from "@/utils/validations/auth.schema";

export async function signInAction(data: SignInSchema) {
  const validatedFields = signInSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: "Invalid credentials" };
    }

    return { success: "Signed in successfully" };
  } catch (error) {
    console.error("Signin error:", error);
    return { error: "An unexpected error occurred" };
  }
}
