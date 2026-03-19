import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/theme-provider";
import { LangProvider } from "@/components/language-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PouraSeva - Admin Portal",
  description: "Digital Pourosova Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider><LangProvider>{children}</LangProvider></ThemeProvider>
      </body>
    </html>
  );
}
