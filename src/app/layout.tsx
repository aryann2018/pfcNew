import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { TopNav } from "./common/TopNav";

export const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PFC Coach App",
  description: "Web app for PFC Coaches",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
