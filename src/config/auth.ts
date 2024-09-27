import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { getUserByEmail } from "@/actions/user-action";
import db from "@/db";
import { sessions } from "@/db/schema";
import { env } from "@/env/env.mjs";
import { signInSchema } from "@/utils/validations/auth.schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = signInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordCorrect) return null;

          return user;
        }

        return null;
      },
    }),
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/",
  },
  secret: env.AUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // Fetch the latest session from the database
        const dbSession = await db.query.sessions.findFirst({
          where: eq(sessions.userId, user.id),
          orderBy: (sessions, { desc }) => [desc(sessions.expires)],
        });
        if (dbSession) {
          session.expires = new Date(dbSession.expires) as unknown as Date &
            string;
        }
      }
      return session;
    },
  },
});
