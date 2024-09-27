"use server";

import bcrypt from "bcryptjs";

import db from "@/db";
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
    await db.insert(users).values({
      email,
      name: `${fName} ${lName}`,
      password: hashedPassword,
      image: "", // You might want to set a default image or make this field optional in your schema
    });

    return { success: "User created successfully" };
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "Something went wrong" };
  }
}
