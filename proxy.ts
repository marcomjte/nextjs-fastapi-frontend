// proxy.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth;  // ← default export

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};