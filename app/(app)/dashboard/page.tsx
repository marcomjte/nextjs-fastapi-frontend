// app/dashboard/page.tsx  ← Server Component, fetch directo al backend
import { auth }          from "@/auth";
import { getServerData } from "@/lib/api";
import { User } from "@/types";

export default async function DashboardPage() {
  const session = await auth();

  // Fetch SSR con el token del usuario
  const user = await getServerData<User>("/auth/me", session?.access_token);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">
          Hola, {user.name} 👋
        </h1>
        <p className="text-gray-500 mt-1 text-sm">{user.email}</p>
      </div>
    </div>
  );
}