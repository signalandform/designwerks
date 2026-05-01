import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Design Werks | Large Format Graphics in Southlake, TX",
  description:
    "Design Werks provides large format printing, vehicle wraps, signage, trade show graphics, banners, and installation across the DFW area.",
  metadataBase: new URL("https://designwerksonline.com"),
  openGraph: {
    title: "Design Werks | Large Format Graphics in Southlake, TX",
    description:
      "Large format printing, vehicle wraps, signage, banners, and installation for DFW businesses.",
    url: "https://designwerksonline.com",
    siteName: "Design Werks",
    images: [
      {
        url: "/assets/legends-of-southlake.jpg",
        width: 1350,
        height: 545,
        alt: "Aerial view of Southlake, Texas",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
