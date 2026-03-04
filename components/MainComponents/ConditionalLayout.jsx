"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  const isAuthRoute = pathname.startsWith("/auth");
  const isCreateRoute = pathname.startsWith("/create");
  
  // Pehle wali conditions
  const isGeneratingRoute = pathname.startsWith("/generating");
  const isResultRoute = pathname.startsWith("/result");

  // Nayi Condition: URL agar /editor se start ho raha ho (query parameters ignore ho jayenge)
  const isEditorRoute = pathname.startsWith("/editor");

  // In sab pages par Navbar aur Footer hide hoga
  const hideAll = isGeneratingRoute || isResultRoute || isEditorRoute;

  return (
    <>
      {/* Navbar logic */}
      {!isAuthRoute && !hideAll && (
        <Navbar minimal={isCreateRoute} />
      )}

      <main>{children}</main>

      {/* Footer logic */}
      {!isAuthRoute && !isCreateRoute && !hideAll && <Footer />}
    </>
  );
}