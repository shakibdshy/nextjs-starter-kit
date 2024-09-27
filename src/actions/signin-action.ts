"use server";

import { AuthError } from "next-auth";

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
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    return { success: "Signed in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    console.error("Signin error:", error);
    return { error: "An unexpected error occurred" };
  }
}
