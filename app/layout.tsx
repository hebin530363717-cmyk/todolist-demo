import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layouts/Header";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A modern Todo List application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
        <Providers>
          <Header />
          <main className="mx-auto max-w-2xl px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
