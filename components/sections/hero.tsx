// "use client";

// import { motion, useReducedMotion, type Variants } from "framer-motion";
// import { ArrowDown, Download, Mail } from "lucide-react";
// import { AppMarquee } from "@/components/sections/app-marquee";
// import { Button } from "@/components/ui/button";
// import { Container } from "@/components/ui/container";
// import { marqueeScreens } from "@/data/screens";
// import { siteConfig } from "@/lib/site";

// const stagger: Variants = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.09 } },
// };

// const rise: Variants = {
//   hidden: { opacity: 0, y: 16 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
// };

// export function Hero() {
//   const reduceMotion = useReducedMotion();

//   return (
//     <section className="pt-32 sm:pt-40">
//       <Container>
//         <motion.div
//           variants={stagger}
//           initial={reduceMotion ? false : "hidden"}
//           animate="show"
//           className="text-center"
//         >
//           <motion.div variants={rise}>
//             <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
//               <span className="relative flex size-2">
//                 <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
//                 <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
//               </span>
//               Open to work
//             </span>
//           </motion.div>

//           <motion.p
//             variants={rise}
//             className="mt-8 font-display text-xl font-bold"
//           >
//             {siteConfig.name}
//           </motion.p>
//           <motion.p
//             variants={rise}
//             className="mt-1 font-mono text-sm text-muted-foreground"
//           >
//             {siteConfig.role}
//           </motion.p>

//           <motion.h1
//             variants={rise}
//             className="mx-auto mt-5 max-w-2xl text-4xl leading-[1.05] font-extrabold text-balance sm:text-6xl"
//           >
//             Building <span className="text-accent">mobile apps</span> for
//             businesses, startups and founders.
//           </motion.h1>

//           <motion.p
//             variants={rise}
//             className="mx-auto mt-5 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg"
//           >
//             I turn ideas into polished React Native apps, from the first screen
//             to a product people actually use.
//           </motion.p>

//           <motion.div
//             variants={rise}
//             className="mt-8 flex flex-wrap items-center justify-center gap-3"
//           >
//             <Button
//               href="/#work"
//               size="lg"
//               icon={ArrowDown}
//               iconPosition="right"
//             >
//               View my work
//             </Button>
//             <Button
//               href="/#contact"
//               variant="secondary"
//               size="lg"
//               icon={Mail}
//             >
//               Get in touch
//             </Button>
//             <Button href="/cv.pdf" variant="ghost" size="lg" icon={Download}>
//               Download CV
//             </Button>
//           </motion.div>
//         </motion.div>
//       </Container>

//       <div className="mt-10 sm:mt-14">
//         <AppMarquee screens={marqueeScreens} />
//       </div>
//     </section>
//   );
// }


"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { AppMarquee } from "@/components/sections/app-marquee";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { marqueeScreens } from "@/data/screens";
import { siteConfig } from "@/lib/site";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-36 sm:pb-20">
      <Container>
        <motion.div
          variants={stagger}
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          className="max-w-4xl"
        >
          {/* Status Badge */}
          <motion.div variants={rise} className="mb-6 inline-flex items-center gap-2.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
              {siteConfig.role} — Open for contract & projects
            </span>
          </motion.div>

          {/* Full-width Bold Headline */}
          <motion.h1
            variants={rise}
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-[1.05]"
          >
            Crafting fluid, high-performance <span className="text-accent">mobile experiences.</span>
          </motion.h1>

          {/* Direct Subtext (No Box, Positioned Below Heading) */}
          <motion.div variants={rise} className="mt-6 max-w-2xl">
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              I partner with teams and founders to build sleek, robust iOS and Android applications. From smooth micro-interactions to scalable architecture, I turn complex client ideas into fast, intuitive software.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={rise}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              href="/#work"
              size="lg"
              icon={ArrowUpRight}
              iconPosition="right"
            >
              Explore Selected Work
            </Button>
            <Button
              href="/#contact"
              variant="secondary"
              size="lg"
              icon={Mail}
            >
              Let’s talk
            </Button>
            <Button href="/cv.pdf" variant="ghost" size="lg" icon={Download}>
              CV
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Marquee Showcase */}
      <div className="mt-16 sm:mt-24">
        <AppMarquee screens={marqueeScreens} />
      </div>
    </section>
  );
}