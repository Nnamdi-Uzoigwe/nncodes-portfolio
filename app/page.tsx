import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { FeaturedApps } from "@/components/sections/featured-apps";
import { Hero } from "@/components/sections/hero";
import { MomentumFlagship } from "@/components/sections/momentum-flagship";
import { Skills } from "@/components/sections/skills";
import { WebProjects } from "@/components/sections/web-projects";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedApps />
      <MomentumFlagship />
      <WebProjects />
      <Skills />
      <About />
      <Contact />
    </>
  );
}