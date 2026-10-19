import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MaxTopNet | Ultra-Fast Internet & TV",
  description: "Experience the future of connectivity with MaxTopNet. Blazing fast internet, HD Live TV, and low-latency game servers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
