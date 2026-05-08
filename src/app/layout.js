import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DataMatch Pro AI | Enterprise Data Matching & Validation",
  description: "Modern AI-powered Excel/XLSX data matching and validation platform with premium futuristic design.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
