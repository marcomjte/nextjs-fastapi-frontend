// app/(app)/layout.tsx
import { auth }     from "@/auth";
import { redirect } from "next/navigation";
import Navbar       from "./_components/Navbar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">{children}</main>
    </div>
  );
}