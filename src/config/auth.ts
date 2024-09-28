import { JWT, JWTEncodeParams } from "@auth/core/jwt";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { v4 as uuid } from "uuid";

import db from "@/db";
import { getUserByEmail } from "@/service/user";

const adapter = DrizzleAdapter(db);

const authConfig: NextAuthConfig = {
  adapter,
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email } = credentials;

        const res = await getUserByEmail(email as string);

        if (res) {
          return res;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
  secret: process.env.AUTH_SECRET!,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);

function defaultEncode(
  params: JWTEncodeParams<JWT>
): string | PromiseLike<string> {
  throw new Error("Function not implemented.");
}
