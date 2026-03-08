import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F0F7FF] dark:bg-[#0F172A]">
      <Sidebar />
      <main className="ml-[260px]">{children}</main>
    </div>
  );
}
