// auth.config.ts
import type { NextAuthConfig } from "next-auth";

// auth.config.ts
export const authConfig: NextAuthConfig = {
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn  = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith("/dashboard");
      const isAuthPage  = nextUrl.pathname === "/login";

      if (isProtected && !isLoggedIn)
        return false;                  // → redirige a /login

      if (isAuthPage && isLoggedIn)
        return Response.redirect(new URL("/dashboard", nextUrl));

      return true;                     // ← /login sin sesión pasa por acá ✅
    },
  },
  pages: { signIn: "/login" },
};