import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "蒋胜 | Developer Portfolio",
  description: "Full-stack developer, AI enthusiast, and open-source contributor. Building the future with code.",
  keywords: ["developer", "hacker", "portfolio", "AI", "machine learning", "open source"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0a] text-white font-mono">
        {/* 矩阵雨背景 */}
        <div className="matrix-bg" />
        
        {/* 扫描线效果 */}
        <div className="scanlines" />
        
        {/* 主内容 */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
