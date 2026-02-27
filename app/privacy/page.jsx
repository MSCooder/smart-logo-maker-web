import Image from "next/image";
import Hero from "../../components/Hero"
import Testomonials from "../../components/Testomonials"
import FinalCTA from "../../components/FinalCTA";
import PrivacyHero from "../../components/PrivacyHero"

export default function Contact() {
    return (
        <>
            <Hero />
            <PrivacyHero />
            <Testomonials />
            <FinalCTA />
        </>
    );
}
