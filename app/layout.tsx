import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextFont } from "next/dist/compiled/@next/font";

const inter: NextFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
