import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import ConditionalLayout from "../components/MainComponents/ConditionalLayout";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata = {
  title: "Smart Logo Maker"
};

export default function RootLayout({ children })
  {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
     </body>
    </html>
  );
}