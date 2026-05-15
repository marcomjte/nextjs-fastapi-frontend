// app/actions/auth.ts
"use server";
import { signIn, signOut } from "@/auth";
import { redirect }        from "next/navigation";
import { AuthError }       from "next-auth";

export async function loginAction(_prevState: unknown, formData: FormData) {
  try {
    await signIn("credentials", {
      email:    formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Email o contraseña incorrectos" };
    }
    throw error; // Errores inesperados se propagan
  }
  redirect("/dashboard"); // Solo llega aquí si el login fue exitoso
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}