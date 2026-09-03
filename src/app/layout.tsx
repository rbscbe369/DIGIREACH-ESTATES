import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Luxury Residential & Commercial Real Estate`,
  description: "Architectural precision, timeless residential communities, and Grade-A commercial tech parks across South India. Registered with RERA.",
  keywords: ["Real Estate Builder", "Luxury Apartments", "Villas", "Commercial Spaces", "Tech Park", "Digireach Estates", "RERA Approved"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#0a0d14] text-slate-100 antialiased selection:bg-[#e07a2c] selection:text-white">
        {children}
      </body>
    </html>
  );
}
