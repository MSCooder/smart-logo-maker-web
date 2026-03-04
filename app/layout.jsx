import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import ConditionalLayout from "../components/MainComponents/ConditionalLayout";
import { Provider } from "react-redux";
import { store } from "@/store/store";
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

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider >
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Provider>
      </body>
    </html>
  );
}