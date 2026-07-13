import type { Metadata } from "next";
import { Archivo, Bricolage_Grotesque, Space_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Antex Pest Solutions — Pest control that holds the line",
    template: "%s | Antex Pest Solutions",
  },
  description:
    "Family-owned pest control and exterminator services in St George, Vernal & Northern Utah since 2014. Safe, effective & guaranteed results — free inspections, EPA-registered products.",
  openGraph: {
    type: "website",
    siteName: "Antex Pest Solutions",
    url: SITE_URL,
    title: "Antex Pest Solutions — Pest control that holds the line",
    description:
      "Family-owned pest control in St George, Vernal & Northern Utah since 2014. Free inspections, free re-service guarantee.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:bg-white focus:px-4 focus:py-2 focus:rounded-sm focus:text-ink-950"
        >
          Skip to main content
        </a>
        <JsonLd />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
