import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";



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
        className="p-2 items-center justify-items-center"
      >
      <Providers>
        <main>
          {children}  
        </main>
      </Providers>
      </body>
    </html>
  );
}
