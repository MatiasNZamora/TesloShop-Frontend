import "./globals.css";
import type { Metadata } from "next";
import { geistSans } from '../config/fonts';
import { Providers } from "../components";

export const metadata: Metadata = {
  title: "Teslo Shop",
  description: "Tienda virtual de productos Tesla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`} >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
