import { requireAcademy } from "@/lib/academy";
import { Sidebar } from "./sidebar";

export const metadata = { title: "Dashboard — RabeeSkool" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const academy = await requireAcademy();

  return (
    <div className="flex h-screen overflow-hidden bg-paper">
      <Sidebar academyName={academy.academyName} fullName={academy.fullName} slug={academy.slug} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
