"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowDownRight } from "lucide-react";

import { webProjects } from "@/data/projects";
import WebProjectCard from "@/components/WebProjectCard";

export default function SelectedWork() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="work"
      aria-labelledby="selected-work-heading"
      className="
        scroll-mt-6 bg-page
        px-5 pt-20 pb-16
        text-neutral-950
        sm:px-8 sm:pt-24
        lg:px-12 lg:pt-28
      "
    >
      <div className="mx-auto max-w-[1800px]">
        {/* Section introduction */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 22 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto max-w-300"
        >
          <div
            className="
              flex items-center justify-between
              border-b border-black/10 pb-4
            "
          >
            <p
              className="
                flex items-center gap-2
                text-[10px] font-semibold
                tracking-[0.18em] text-neutral-500 uppercase
                sm:text-xs
              "
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-plum"
              />
              Selected work
            </p>

            <span
              className="
                text-[10px] font-medium
                tracking-[0.14em] text-neutral-400
              "
            >
              01 — 03 / WEB
            </span>
          </div>

          <div
            className="
              mt-7 flex items-end
              justify-between gap-6 sm:mt-9
            "
          >
            <h2
              id="selected-work-heading"
              className="
                font-heading
                text-[clamp(2.3rem,5.8vw,5.5rem)]
                font-normal leading-[1.02]
                tracking-[-0.045em]
              "
            >
              Real projects.
              <br />
              <span className="text-plum">
                Live on the web.
              </span>
            </h2>

            <span
              aria-hidden="true"
              className="
                mb-1 hidden size-14
                shrink-0 items-center justify-center
                rounded-full border border-black/10
                text-plum sm:flex
              "
            >
              <ArrowDownRight
                size={25}
                strokeWidth={1.5}
              />
            </span>
          </div>

          <p
            className="
              mt-5 max-w-lg
              text-sm leading-relaxed
              text-neutral-600 sm:text-base
            "
          >
            Mobile is my focus of recent but I also build and ship websites
            for real clients—here are three of them.
          </p>
        </motion.div>

        {/* Three client websites, in the requested order */}
        <div
          className="
            mx-auto mt-10 max-w-300
            space-y-8 sm:mt-14 sm:space-y-12
          "
        >
          {webProjects.map((project, index) => (
            <WebProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}