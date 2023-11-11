import { ReactElement, ReactNode } from "react";

import { ClerkProvider } from "@clerk/nextjs";
import { NextFont } from "next/dist/compiled/@next/font";
import { Inter } from "next/font/google";
import { Metadata } from "next/types";

import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";

import "./globals.css";

const inter: NextFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

function RootLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

export default RootLayout;
