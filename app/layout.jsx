import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import ConditionalLayout from "../components/MainComponents/ConditionalLayout";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = { title: "Smart Logo Maker" };

export default function LandingLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* Ye wrapper ab har route change par khud ko update karega */}
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
      </body>
    </html>
  );
}