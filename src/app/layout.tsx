import type { Metadata } from "next";

import QueryProvider from "@/components/tanstackQuery/QueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Private admin dashboard",
  robots: "noindex, nofollow",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
