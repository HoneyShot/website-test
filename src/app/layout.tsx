import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideHeader from "./components/layout/SideHeader";
import Footer from "./components/layout/Footer";
import Logo from "./components/layout/Logo";
import Providers from "./components/Providers";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Full Stack Engineer Portfolio",
  description: "Portfolio showcasing expertise in Full Stack Software Development, Cloud Services, and Web Applications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          <div className="fixed top-4 left-4 z-40">
            <Logo />
          </div>
          <SideHeader />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}