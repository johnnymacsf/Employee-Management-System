import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Employee Management System",
  description: "Easily manage your employees and work schedules!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans"
      >
        <header className="bg-blue-500 p-6">
          <nav className="flex space-x-4 justify-center items-center">
            <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded text-xl font-semibold hover:bg-blue-400">Home</Link>
            <Link href="/manager" className="bg-blue-500 text-white px-4 py-2 rounded text-xl font-semibold hover:bg-blue-400">Employee Manager</Link>
            <Link href="/schedule" className="bg-blue-500 text-white px-4 py-2 rounded text-xl font-semibold hover:bg-blue-400">Schedule Manager</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
