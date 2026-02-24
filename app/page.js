import Image from "next/image";
import Hero from "../components/Hero"
import Features from "@/components/Features";
import Howitworks from "../components/Howitworks"
import Testomonials from "../components/Testomonials"
import GetStarted from "../components/FinalCTA"
import FinalCTA from "../components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Howitworks />
      <Testomonials />
      <FinalCTA/>
    </>
  );
}
