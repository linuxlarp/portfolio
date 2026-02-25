// /src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { TerminalProvider } from "../components/TerminalContext";

const nerdFont = localFont({
  src: [
    {
      path: "../../public/fonts/CaskaydiaCoveNerdFont-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/CaskaydiaCoveNerdFont-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nerd",
  display: "swap",
});

export const metadata: Metadata = {
  openGraph: {
    title: "linuxlarp",
    url: "https://linuxlarp.dev",
    siteName: "linuxlarp.dev",
    description:
      "The offical terminal-based portfolio for linuxlarp. Includes experience, projects, skills and more about my linux setup and rice!",
    images: [
      {
        url: "https://linuxlarp.dev/static/images/welcome_banner.webp",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  icons: {
    icon: "/static/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="theme-color" content="#628df0" />

      <body className={` ${nerdFont.variable} antialiased bg-black`}>
        <TerminalProvider>{children}</TerminalProvider>
      </body>
    </html>
  );
}
