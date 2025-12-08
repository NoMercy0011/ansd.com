import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";



export const metadata: Metadata = {
  title: "ANS Desing Print",
  description: "Application de gestion de point de vente pour ANS Desing Print, une imprimerie basée à Antananarivo, Madagascar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className="m-0"
      >
      <Providers>
        <main>
          {children} 
          <Toaster position="top-right"/> 
        </main>
      </Providers>
      </body>
    </html>
  );
}
