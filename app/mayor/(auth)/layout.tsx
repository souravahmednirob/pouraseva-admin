import HomeButton from "@/components/home-button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <><HomeButton />{children}</>;
}
