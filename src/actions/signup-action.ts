"use server";

import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import db from "@/db";
import { sessions, users } from "@/db/schema";
import { getUserByEmail } from "@/service/user";
import { SignUpSchema, signUpSchema } from "@/utils/validations/auth.schema";

export async function signUpAction(data: SignUpSchema) {
  const validatedFields = signUpSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { fName, lName, email, password } = validatedFields.data;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(users)
      .values({
        name: `${fName} ${lName}`,
        email,
        password: hashedPassword,
      })
      .returning();
    const sessionToken = uuidv4();
    await db.insert(sessions).values({
      sessionToken,
      userId: user.id,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiration
    });

    return { success: "User created successfully", sessionToken };
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "An unexpected error occurred" };
  }
}
