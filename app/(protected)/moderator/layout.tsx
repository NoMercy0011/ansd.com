import LateralBar from "@/src/components/moderator/LateralBar";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Espace Respnsable",
  description: "Lova Tsara indrindra Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
      <div className="items-center justify-center">
        <LateralBar />
        <div className="p-2 items-center justify-items-center">
          {children}  
        </div>
      </div>
      </>
  );
}