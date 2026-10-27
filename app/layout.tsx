

// import type { Metadata } from "next";
// import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
// import { Footer } from "@/components/layout/footer";
// import { Navbar } from "@/components/layout/navbar";
// import { ThemeProvider } from "@/components/theme-provider";
// import { siteConfig } from "@/lib/site";
// import "./globals.css";

// const geist = Geist({
//   subsets: ["latin"],
//   variable: "--font-geist",
//   display: "swap",
// });

// const geistMono = Geist_Mono({
//   subsets: ["latin"],
//   variable: "--font-geist-mono",
//   display: "swap",
// });

// const bricolage = Bricolage_Grotesque({
//   subsets: ["latin"],
//   variable: "--font-bricolage",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   metadataBase: new URL(siteConfig.url),
//   title: {
//     default: `${siteConfig.name} | ${siteConfig.role}`,
//     template: `%s | ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html
//       lang="en"
//       className={`${geist.variable} ${geistMono.variable} ${bricolage.variable}`}
//       suppressHydrationWarning
//     >
//       <body className="font-sans antialiased">
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="light"
//           enableSystem={false}
//           disableTransitionOnChange
//         >
//           <a
//             href="#main"
//             className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-button focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
//           >
//             Skip to content
//           </a>
//           <div id="top" className="flex min-h-dvh flex-col">
//             <Navbar />
//             <main id="main" className="flex-1">
//               {children}
//             </main>
//             <Footer />
//           </div>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Instrument_Sans,
  JetBrains_Mono,
} from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-button focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
          >
            Skip to content
          </a>
          <div id="top" className="flex min-h-dvh flex-col">
            <Navbar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}