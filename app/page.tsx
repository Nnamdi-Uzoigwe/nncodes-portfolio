import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MobileProjects from "@/components/MobileProjects";
import SelectedWork from "@/components/SelectedWork";
import SmoothScroll from "@/components/SmoothScroll";
import type { Metadata } from "next";


export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <SmoothScroll>

    <main className="bg-page text-page-text">
      <Hero />
      <SelectedWork />
      <MobileProjects />
      <About />
      <Contact />
      <Footer />
    </main>
    </SmoothScroll>
  );
}