"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  const isAuthRoute = pathname.startsWith("/auth");
  const isCreateRoute = pathname.startsWith("/create");
  const isGeneratingRoute = pathname.startsWith("/generating");
  const isResultRoute = pathname.startsWith("/result");
  const isEditorRoute = pathname.startsWith("/editor");

  
  return (
    <>
      {/* Navbar: Ab Editor par bhi show hoga (minimal version) */}
      {!isAuthRoute && (
        <Navbar 
          minimal={isCreateRoute || isGeneratingRoute || isResultRoute || isEditorRoute} 
        />
      )}

      <main>{children}</main>

      {/* Footer: In sab paths par hide rahega */}
      {!isAuthRoute && !isCreateRoute && !isGeneratingRoute && !isResultRoute && !isEditorRoute && (
        <Footer />
      )}
    </>
  );
}