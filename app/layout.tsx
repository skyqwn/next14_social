import type { Metadata } from "next";
import { Open_Sans, Pacifico, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal"],
  variable: "--openSans-text",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--pacifico-text",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--roboto-text",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Next SNS",
    default: "NEXT SNS",
  },
  description: "넥스트14로 만든 SNS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${openSans.variable} ${pacifico.variable} ${roboto.variable} bg-slate-100 font-roboto`}
        >
          <div className="w-full bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
            <Navbar />
          </div>
          <div className="bg-slate-100 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
            {children}
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
