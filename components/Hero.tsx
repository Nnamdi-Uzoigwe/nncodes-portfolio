"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import FluidWord from "@/components/Fluidword";
import CurvedAppMarquee from "@/components/CurvedAppMarquee";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="
        relative isolate overflow-hidden
        bg-page text-neutral-950
        dark:bg-neutral-950 dark:text-white
      "
    >
      {/* Dot field occupies only the rightmost quarter */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-y-0 right-0
          z-0 hidden w-1/4 lg:block
        "
      >
        <div className="hero-dot-field absolute inset-0" />
      </div>

      <div
        className="
          relative z-10 mx-auto max-w-[1800px]
          px-5 pt-10 sm:px-8
          lg:px-12 lg:pt-12
        "
      >
        {/* Identity */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            flex flex-wrap items-center
            gap-x-2.5 gap-y-2
            text-xs font-medium sm:text-sm
          "
        >
          <span
            aria-hidden="true"
            className="relative flex size-2.5 shrink-0"
          >
            <span
              className="
                absolute inline-flex size-full
                animate-ping rounded-full
                bg-emerald-500 opacity-40
                motion-reduce:animate-none
              "
            />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
          </span>

          <span>Nnamdi Uzoigwe</span>

          <span aria-hidden="true" className="text-neutral-300">
            ·
          </span>

          <span className="text-neutral-500">
            Available for projects
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            font-heading mt-10
            text-[clamp(2.7rem,8.7vw,10rem)]
            font-normal leading-[0.98]
            tracking-[-0.055em]
            sm:mt-14
          "
        >
          <span className="flex flex-wrap items-baseline gap-x-[0.16em]">
            <span>Crafting</span>

            <span
              className="
                inline-block text-plum
                dark:text-[#d5a4db]
                [&>span]:my-0!
                [&>span]:inline-block!
                [&>span]:py-0!
                [&>span]:text-[1em]!
                [&>span]:leading-[inherit]!
                [&>span]:tracking-[inherit]!
                dark:[&>span]:text-[#d5a4db]!
              "
            >
              <FluidWord word="Fluid" />
            </span>
          </span>

          <span className="block">High Performance</span>
          <span className="block">Mobile &amp; Web Apps.</span>
        </motion.h1>

        {/* Supporting copy and CTAs */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-8 sm:mt-10"
        >
          <p
            className="
              max-w-162.5 text-base
              leading-relaxed text-neutral-600
              sm:text-lg lg:text-xl
            "
          >
            I build fast, smooth apps for businesses, startups and
            founders—from the first screen to the app store.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4 sm:mt-8">
            <a
              href="#work"
              className="
                group inline-flex items-center gap-5
                border-b border-plum/25 pb-3
                text-sm font-bold text-plum
                transition-colors hover:border-plum
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-plum
                dark:border-white/25
                dark:text-[#d5a4db]
              "
            >
              See selected work

              <span
                className="
                  flex size-11 items-center justify-center
                  overflow-hidden rounded-full
                  bg-plum text-white
                  transition-transform duration-300
                  group-hover:-rotate-12
                  group-active:scale-95
                  motion-reduce:transform-none
                "
              >
                <ArrowUpRight
                  size={20}
                  aria-hidden="true"
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    motion-reduce:transform-none
                  "
                />
              </span>
            </a>

            <a
              href="#contact"
              className="
                group inline-flex items-center gap-2 pb-3
                text-sm font-semibold text-neutral-600
                transition-colors hover:text-plum
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-plum
              "
            >
              Let’s talk

              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="
                  transition-transform duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                  motion-reduce:transform-none
                "
              />
            </a>
          </div>
        </motion.div>

        {/* Bottom-center showcase */}
        <CurvedAppMarquee />

        {/* Section boundary */}
        <div
          className="
            relative mt-4 flex items-center justify-between
            gap-4 border-t border-black/10
            pt-5 pb-8
            text-[9px] font-semibold
            tracking-[0.14em] text-neutral-500 uppercase
            sm:text-[10px] sm:tracking-[0.18em]
          "
        >
          <span>Mobile apps &amp; production websites</span>

          <a
            href="#work"
            className="
              hidden shrink-0 items-center gap-2
              pr-24 transition-colors
              hover:text-plum sm:inline-flex
            "
          >
            Explore the work
            <ArrowDown size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}