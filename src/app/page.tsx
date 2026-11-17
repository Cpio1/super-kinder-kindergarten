import { LangProvider } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RevealObserver } from "@/components/RevealObserver";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Food } from "@/components/sections/Food";
import { Clubs } from "@/components/sections/Clubs";
import { Gallery } from "@/components/sections/Gallery";
import { Documents } from "@/components/sections/Documents";
import { Contacts } from "@/components/sections/Contacts";

export default function Home() {
  return (
    <LangProvider>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-white px-4 py-2 font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Негізгі мазмұнға өту
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Food />
        <Clubs />
        <Gallery />
        <Documents />
        <Contacts />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </LangProvider>
  );
}
