import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { Image } from "@nextui-org/react";
import HomeEntry from "@/components/HomeEntry";
import InfoSection from "@/components/InfoSection";
import MarketplaceSection from "@/components/MarketplaceSection";
import Investors from "@/components/Investors";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full flex-col  h-full flex   justify-center items-center bg-[url('/illustrations/home-section-bg.webp')] bg-contain bg-no-repeat ">
      <section className="w-screen h-screen sm:h-full ">
        <HomeEntry />
      </section>
      <section id="INFO" className="w-screen h-screen sm:h-full ">
        <InfoSection />
      </section>
      <section
        id="MARKETPLACE"
        className="w-screen h-screen sm:h-full sm:pb-24">
        <MarketplaceSection />
      </section>
      <section id="PARTNERS" className="w-screen h-screen sm:h-full ">
        <Investors />
      </section>
      <section className="w-screen h-full">
        <Footer />
      </section>
    </main>
  );
}
