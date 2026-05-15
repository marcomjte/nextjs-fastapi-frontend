// app/(app)/_components/Navbar.tsx
import { auth }        from "@/auth";
import LogoutButton    from "./LogoutButton";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <span className="font-bold text-gray-800">Mi App</span>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">{session?.user?.email}</span>
        <LogoutButton />
      </div>
    </nav>
  );
}