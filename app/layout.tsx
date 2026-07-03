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
  title: "RabeeSkool — Launch your online academy. Keep 100% of what you earn.",
  description:
    "The all-in-one LMS for Pakistani educators and coaches. Courses, community, coaching, certificates and PKR payments in one platform — with 0% commission, forever.",
  keywords: [
    "LMS Pakistan",
    "online academy",
    "sell courses Pakistan",
    "course platform PKR",
    "RabeeSkool",
  ],
  openGraph: {
    title: "RabeeSkool — Where learning grows",
    description:
      "Courses, community, coaching and PKR payments in one platform. 0% commission, forever.",
    type: "website",
    locale: "en_PK",
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
