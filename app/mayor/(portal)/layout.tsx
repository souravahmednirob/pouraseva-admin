import MayorSidebar from "@/components/mayor-sidebar";
import HomeButton from "@/components/home-button";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F0F7FF] dark:bg-[#0F172A]">
      <HomeButton />
      <MayorSidebar />
      <main className="ml-[260px]">{children}</main>
    </div>
  );
}
