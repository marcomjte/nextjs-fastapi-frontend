// app/dashboard/LogoutButton.tsx  ← Mínimo "use client"
"use client";
import { logoutAction } from "@/app/actions/auth";

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="text-sm text-red-500 hover:text-red-700 transition"
      >
        Cerrar sesión
      </button>
    </form>
  );
}