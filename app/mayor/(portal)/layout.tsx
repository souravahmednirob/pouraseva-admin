import MayorSidebar from "@/components/mayor-sidebar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F0F7FF] dark:bg-[#0F172A]">
      <MayorSidebar />
      <main className="ml-[260px]">{children}</main>
    </div>
  );
}
