import type { Metadata } from "next";
import { seo, siteUrl } from "@/lib/seo";
import { Righteous, Manrope } from "next/font/google";
import "./globals.css";
import MenuOrb from "@/components/MenuOrb";
import CustomCursor from "@/components/CustomCursor";
import ThemeProvider from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";

const righteous = Righteous({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: seo.title,
    template: "%s — Nnamdi Uzoigwe",
  },

  description: seo.description,

  applicationName: "Nnamdi Uzoigwe Portfolio",

  authors: [
    {
      name: seo.name,
      url: siteUrl,
    },
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nnamdi Uzoigwe",
    title: seo.title,
    description: seo.description,
  },

  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${righteous.variable} ${manrope.variable}`}
    >
      <body className="font-body antialiased">
        <ThemeProvider>
          <SmoothScroll>
            {children}
            <CustomCursor />
            <MenuOrb />
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
