import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, DM_Serif_Display, EB_Garamond, Outfit } from "next/font/google";
import { SITE } from "@/lib/config";
import { ClientShell } from "@/components/ClientShell";
import "./globals.css";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-cormorant" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-dm-serif" });
const instrumentSerif = EB_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-instrument" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: "/royal-priesthood-preview.png",
        width: 1024,
        height: 1024,
        alt: "A regal navy and gold crown-and-cradle announcement visual"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/royal-priesthood-preview.png"]
  },
  icons: {
    icon: "/royal-priesthood-preview.png",
    apple: "/royal-priesthood-preview.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#0B1B3D",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${cinzel.variable} ${outfit.variable} ${cormorant.variable} ${dmSerif.variable} ${instrumentSerif.variable}`}>
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
