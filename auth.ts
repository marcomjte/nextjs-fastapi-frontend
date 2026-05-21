// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email:    { label: "Email",      type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email:    credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) return null;
        return res.json();
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id           = user.id;
        token.access_token = (user as any).access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id           = token.id as string;
      (session as any).access_token = token.access_token;
      return session;
    },
  },
});