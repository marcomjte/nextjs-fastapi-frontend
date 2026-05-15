// app/(auth)/login/page.tsx  ← Server Component
import { auth }     from "@/auth";
import { redirect } from "next/navigation";
import LoginForm    from "./LoginForm";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/dashboard"); // Redirige en servidor, sin flash

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Bienvenido</h1>
          <p className="text-sm text-gray-500 mt-1">Ingresá a tu cuenta</p>
        </div>

        <LoginForm />

      </div>
    </main>
  );
}