import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "REST API Visualizer",
  description: "An educational tool that shows how HTTP requests work, step by step.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}
