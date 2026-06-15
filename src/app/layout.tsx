import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Shaghaf | Perfume Manufacturing & Sales",
  description:
    "Shaghaf — luxury Arabian perfumery. Where scent becomes art. Rare oud, precious florals, and centuries-old craft, distilled into fragrance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
