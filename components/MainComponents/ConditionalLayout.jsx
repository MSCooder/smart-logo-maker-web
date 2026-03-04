"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  const isAuthRoute = pathname.startsWith("/auth");
  const isCreateRoute = pathname.startsWith("/create");

  return (
    <>
      {/* Agar Auth route nahi hai, to Navbar dikhao. 
          Lekin agar Create route hai, to 'minimal' mode on kar do */}
      {!isAuthRoute && (
        <Navbar minimal={isCreateRoute} />
      )}

      <main>{children}</main>

      {/* Footer sirf tab dikhao jab na Auth route ho aur na hi Create route */}
      {!isAuthRoute && !isCreateRoute && <Footer />}
    </>
  );
}