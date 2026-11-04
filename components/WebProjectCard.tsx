"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Globe2, ImageIcon } from "lucide-react";

import type { WebProject } from "@/data/projects";

type Props = {
  project: WebProject;

  // Retained so the previous SelectedWork implementation still compiles.
  index?: number;
};

export default function WebProjectCard({ project }: Props) {
  const reduceMotion = useReducedMotion();
  const [imageFailed, setImageFailed] = useState(false);

  let hostname = "";

  if (project.url) {
    try {
      hostname = new URL(project.url).hostname.replace(/^www\./, "");
    } catch {
      hostname = "";
    }
  }

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
      aria-labelledby={`project-${project.id}`}
      className="
        group overflow-hidden rounded-3xl
        border border-black/8 bg-white
        sm:rounded-[30px]
      "
    >
      {/* Colored screenshot stage */}
      <div
        className="
          relative isolate overflow-hidden
          border-b border-black/6
          px-5 pt-6
          sm:px-10 sm:pt-9
          lg:px-16 lg:pt-11
        "
        style={{ backgroundColor: project.palette.stage }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background: `
              radial-gradient(
                ellipse at 50% 100%,
                ${project.palette.glow} 0%,
                transparent 72%
              )
            `,
          }}
        />

        <div
          className="
            mb-5 flex items-center justify-between
            text-[9px] font-semibold tracking-[0.16em]
            uppercase sm:mb-7 sm:text-[10px]
          "
          style={{ color: project.palette.accent }}
        >
          <span>{project.id} / Production web</span>

          <span className="flex items-center gap-1.5">
            <Globe2 size={12} aria-hidden="true" />
            Web experience
          </span>
        </div>

        {/* Browser frame */}
        <div
          className="
            relative mx-auto max-w-250
            origin-bottom translate-y-px
            overflow-hidden rounded-t-2xl
            border border-b-0 bg-white
            shadow-[0_18px_60px_-24px_rgba(54,40,18,0.3)]
            transition-transform duration-700
            ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:-translate-y-1
            motion-reduce:transform-none
            sm:rounded-t-2xl
          "
          style={{ borderColor: project.palette.frame }}
        >
          <div
            className="
              flex h-9 items-center gap-3
              border-b border-black/6
              bg-[#FAFAF8] px-3
              sm:h-11 sm:px-4
            "
          >
            <div aria-hidden="true" className="flex shrink-0 gap-1.5">
              <span className="size-1.5 rounded-full bg-[#D8D5CE]" />
              <span className="size-1.5 rounded-full bg-[#D8D5CE]" />
              <span className="size-1.5 rounded-full bg-[#D8D5CE]" />
            </div>

            <div
              className="
                mx-auto flex h-5 w-[62%]
                items-center justify-center
                rounded-md border border-black/4
                bg-white px-3 sm:h-6 sm:w-[50%]
              "
            >
              <span className="truncate text-[8px] font-medium text-neutral-400 sm:text-[10px]">
                {hostname || project.name}
              </span>
            </div>

            <ArrowUpRight
              size={12}
              aria-hidden="true"
              className="shrink-0 text-neutral-400"
            />
          </div>

          <div className="relative aspect-16/10 overflow-hidden bg-white sm:aspect-video">
            {!imageFailed ? (
              <Image
                src={project.image}
                alt={`${project.name} website preview`}
                fill
                sizes="
                  (min-width: 1280px) 1000px,
                  (min-width: 768px) 85vw,
                  90vw
                "
                className="object-cover object-top"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <div
                className="
                  absolute inset-0 flex flex-col
                  items-center justify-center gap-3
                  p-6 text-center
                "
                style={{
                  backgroundColor: project.palette.stage,
                  color: project.palette.accent,
                }}
              >
                <ImageIcon
                  size={28}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="opacity-60"
                />

                <p className="font-heading text-xl sm:text-3xl">
                  {project.name}
                </p>

                <p className="text-xs opacity-70">
                  Website preview unavailable.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project details */}
      <div className="p-5 sm:p-8 lg:px-10 lg:py-9">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
                {project.label}
              </p>

              {project.live && (
                <span
                  className="
                    inline-flex items-center gap-1.5
                    rounded-full bg-emerald-50
                    px-2.5 py-1 text-[10px]
                    font-semibold text-emerald-800
                  "
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-emerald-500"
                  />
                  Live website
                </span>
              )}
            </div>

            <h3
              id={`project-${project.id}`}
              className="
                font-heading mt-3
                text-[1.65rem] font-normal
                leading-[1.1] tracking-[-0.035em]
                text-neutral-950 sm:text-3xl lg:text-4xl
              "
            >
              {project.name}
            </h3>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
              {project.description}
            </p>
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name} website in a new tab`}
              className="
                group/link inline-flex w-fit shrink-0
                items-center gap-3 text-sm
                font-bold text-plum
                focus-visible:rounded-lg
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-plum
                sm:mt-1
              "
            >
              <span>Visit site</span>

              <span
                className="
                  flex size-11 items-center justify-center
                  rounded-full bg-plum text-white
                  transition-transform duration-300
                  group-hover/link:-rotate-12
                  group-active/link:scale-95
                  motion-reduce:transform-none
                "
              >
                <ArrowUpRight size={19} aria-hidden="true" />
              </span>
            </a>
          )}
        </div>

        {project.tags.length > 0 && (
          <ul
            aria-label="Technologies used"
            className="
              mt-6 flex flex-wrap gap-2
              border-t border-black/6 pt-5
            "
          >
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="
                  rounded-full border border-black/8
                  bg-neutral-50 px-3 py-1.5
                  text-[11px] font-medium text-neutral-600
                "
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}