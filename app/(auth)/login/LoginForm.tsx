// app/(auth)/login/LoginForm.tsx  ← Único "use client" del login
"use client";
import { useActionState } from "react";
import { loginAction }    from "@/app/actions/auth";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    { error: "" }
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:opacity-50"
          placeholder="tu@email.com"
          disabled={isPending}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full border border-gray-300 rounded-lg px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:opacity-50"
          placeholder="••••••••"
          disabled={isPending}
        />
      </div>

      {state?.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm text-center">{state.error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium
                   hover:bg-blue-700 active:bg-blue-800 transition
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Verificando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}