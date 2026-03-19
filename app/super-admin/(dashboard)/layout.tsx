import Sidebar from "@/components/sidebar";
import HomeButton from "@/components/home-button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F0F7FF] dark:bg-[#0F172A]">
      <HomeButton />
      <Sidebar />
      <main className="ml-[260px]">{children}</main>
    </div>
  );
}
