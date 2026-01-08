
// /src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import { TerminalProvider } from "../components/TerminalContext";

const nerdFont = localFont({
  src: [
    {
      path: '../../public/fonts/CaskaydiaCoveNerdFont-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CaskaydiaCoveNerdFont-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-nerd',
  display: 'swap',
})


export const metadata: Metadata = {
  title: "linuxlarp.dev",
  description: "Portfolio and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${nerdFont.variable} antialiased bg-black`}
      >
        <TerminalProvider>
          {children}
        </TerminalProvider>
      </body>
    </html>
  );
}
