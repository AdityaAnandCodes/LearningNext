import type { Metadata } from "next";
import {Open_Sans} from "next/font/google";
import "./globals.css";

const OpenSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const OpenSansMono = Open_Sans({
  variable: "--font-open-sans-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Step Closer",
  description: "Step Closer To Your Goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${OpenSans.variable} ${OpenSansMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
