"use server";

import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { signIn } from "@/config/auth";
import db from "@/db";
import { sessions } from "@/db/schema/sessions";
import { users } from "@/db/schema/users";
import { SignUpSchema, signUpSchema } from "@/utils/validations/auth.schema";

import { getUserByEmail } from "./user-action";

export async function signUpAction(data: SignUpSchema) {
  const validatedFields = signUpSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, fName, lName } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        name: `${fName} ${lName}`,
        password: hashedPassword,
        image: "https://i.pravatar.cc/150?u=a04258114e29026708c", // Provide a default image URL
      })
      .returning();

    // Sign in the user immediately after signup
    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInResult?.error) {
      return { error: "Failed to sign in after registration" };
    }

    // Create and store session in the database
    const sessionToken = uuidv4();
    await db.insert(sessions).values({
      sessionToken,
      userId: newUser.id,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    });

    return {
      success: "User created, signed in, and session stored successfully",
    };
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "Something went wrong" };
  }
}
