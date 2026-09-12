import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LittleStars ToySwap - 星宝玩具屋",
  description: "Give outgrown toys a second life, bring new smiles to kids. Exchange toys with Star Coins!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased bg-cream min-h-screen">
        {children}
      </body>
    </html>
  );
}
