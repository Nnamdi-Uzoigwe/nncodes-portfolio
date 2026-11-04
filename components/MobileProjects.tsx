"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  // Github,
  ImageIcon,
  Smartphone,
} from "lucide-react";

import {
  projects,
  type Project,
} from "@/data/projects";

type Palette = {
  stage: string;
  accent: string;
  glow: string;
};

const PALETTES: Record<string, Palette> = {
  momentum: {
    stage: "#f2e4d0",
    accent: "#9D512D",
    glow: "#ECD1BA",
  },
  novara: {
    stage: "#d8e0f0",
    accent: "#485264",
    glow: "#D0D6E1",
  },
  spendwise: {
    stage: "#cce6cf",
    accent: "#476C4E",
    glow: "#CADFCC",
  },
  bobo: {
    stage: "#f2e4d0",
    accent: "#A45A35",
    glow: "#F0D2BF",
  },
  scanly: {
    stage: "#d9d1eb",
    accent: "#69508C",
    glow: "#D8CCE9",
  },
};

const FALLBACK_PALETTE: Palette = {
  stage: "#F4EEF5",
  accent: "#5B1F5E",
  glow: "#E1CCE3",
};

function StatusBadge({ status }: { status: string }) {
  const isDevelopment = status === "In development";
  const isMvp = status === "MVP";

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full px-2.5 py-1
        text-[10px] font-semibold
        ${
          isDevelopment
            ? "bg-amber-50 text-amber-800"
            : isMvp
              ? "bg-emerald-50 text-emerald-800"
              : "bg-neutral-100 text-neutral-600"
        }
      `}
    >
      <span
        aria-hidden="true"
        className={`
          size-1.5 rounded-full
          ${
            isDevelopment
              ? "bg-amber-500"
              : isMvp
                ? "bg-emerald-500"
                : "bg-neutral-400"
          }
        `}
      />

      {status}
    </span>
  );
}

function AppScreenshot({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`
        relative w-full
        ${
          featured
            ? "h-90 sm:h-110 lg:h-120"
            : "h-82.5 sm:h-97.5 lg:h-107.5"
        }
      `}
    >
      {!failed ? (
        <Image
          src={project.screen}
          alt={`${project.name} app shown in an iPhone frame`}
          fill
          sizes={
            featured
              ? "(min-width: 1024px) 480px, 85vw"
              : "(min-width: 768px) 45vw, 85vw"
          }
          unoptimized
          className="
            object-contain
            drop-shadow-[0_18px_22px_rgba(35,25,30,0.14)]
          "
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="
            absolute inset-0 flex flex-col
            items-center justify-center
            gap-3 px-6 text-center
          "
        >
          <ImageIcon
            size={30}
            strokeWidth={1.5}
            aria-hidden="true"
            className="opacity-50"
          />

          <p className="text-sm font-semibold">
            {project.name}
          </p>

          <p className="text-xs opacity-60">
            Add the framed screenshot at {project.screen}
          </p>
        </div>
      )}
    </div>
  );
}

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <ul
      aria-label="Technologies used"
      className="flex flex-wrap gap-2"
    >
      {tags.map((tag) => (
        <li
          key={tag}
          className="
            rounded-full border border-black/8
            bg-white/70 px-3 py-1.5
            text-[10px] font-medium text-neutral-600
            sm:text-[11px]
          "
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ProjectActions({
  project,
}: {
  project: Project;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
      <Link
        href={`/projects/${project.slug}`}
        className="
          group/action inline-flex items-center gap-3
          text-sm font-bold text-plum
          focus-visible:rounded-lg
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-plum
        "
      >
        Explore project

        <span
          className="
            flex size-10 items-center justify-center
            rounded-full bg-plum text-white
            transition-transform duration-300
            group-hover/action:-rotate-12
            group-active/action:scale-95
            motion-reduce:transform-none
          "
        >
          <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </Link>

    </div>
  );
}

function FeaturedApp({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const palette =
    PALETTES[project.slug] ?? FALLBACK_PALETTE;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
      aria-labelledby={`mobile-${project.slug}`}
      className="
        overflow-hidden rounded-3xl
        border border-black/8
        bg-white sm:rounded-[30px]
      "
    >
      <div className="grid lg:grid-cols-2">
        {/* Featured introduction */}
        <div
          className="
            flex flex-col justify-center
            p-6 sm:p-9 lg:p-12
          "
        >
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="
                text-[10px] font-semibold
                tracking-[0.16em] text-plum
                uppercase
              "
            >
              Featured mobile build
            </span>

            <StatusBadge status={project.status} />
          </div>

          <h3
            id={`mobile-${project.slug}`}
            className="
              font-heading mt-6
              text-4xl font-normal
              leading-[1.05] tracking-[-0.045em]
              sm:text-5xl lg:text-6xl
            "
          >
            {project.name}
          </h3>

          <p
            className="
              mt-3 text-base font-semibold
              text-neutral-800 sm:text-lg
            "
          >
            {project.tagline}
          </p>

          <p
            className="
              mt-4 max-w-md
              text-sm leading-relaxed
              text-neutral-600 sm:text-base
            "
          >
            {project.description}
          </p>

          <div className="mt-6">
            <ProjectTags tags={project.tags} />
          </div>

          <div className="mt-8">
            <ProjectActions project={project} />
          </div>
        </div>

        {/* Existing iPhone mockup, displayed as-is */}
        <div
          className="
            relative isolate flex items-center
            justify-center overflow-hidden
            border-t border-black/6
            px-6 py-8
            sm:px-10
            lg:border-t-0 lg:border-l lg:py-10
          "
          style={{
            backgroundColor: palette.stage,
            color: palette.accent,
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: `
                radial-gradient(
                  ellipse at 50% 60%,
                  ${palette.glow} 0%,
                  transparent 72%
                )
              `,
            }}
          />

          <AppScreenshot project={project} featured />
        </div>
      </div>
    </motion.article>
  );
}

function MobileAppCard({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const palette =
    PALETTES[project.slug] ?? FALLBACK_PALETTE;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      aria-labelledby={`mobile-${project.slug}`}
      className="
        flex h-full flex-col
        overflow-hidden rounded-3xl
        border border-black/8
        bg-white sm:rounded-[28px]
      "
    >
      {/* App visual */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Explore ${project.name}`}
        className="
          group/preview relative isolate block
          overflow-hidden border-b border-black/6
          px-6 pt-5 pb-7
          focus-visible:outline-2
          focus-visible:-outline-offset-4
          focus-visible:outline-plum
          sm:px-8 sm:pt-6 sm:pb-8
        "
        style={{
          backgroundColor: palette.stage,
          color: palette.accent,
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(
                ellipse at 50% 65%,
                ${palette.glow} 0%,
                transparent 75%
              )
            `,
          }}
        />

        <div
          className="
            mb-4 flex items-center justify-between
            text-[9px] font-semibold
            tracking-[0.14em] uppercase
          "
        >
          <span>{project.tagline}</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </div>

        <div
          className="
            transition-transform duration-500
            ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover/preview:-translate-y-2
            group-focus-visible/preview:-translate-y-2
            motion-reduce:transform-none
          "
        >
          <AppScreenshot project={project} />
        </div>
      </Link>

      {/* Information */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3
            id={`mobile-${project.slug}`}
            className="
              font-heading text-[1.7rem]
              font-normal leading-[1.1]
              tracking-[-0.035em]
              sm:text-3xl
            "
          >
            {project.name}
          </h3>

          <StatusBadge status={project.status} />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          {project.description}
        </p>

        <div className="mt-5">
          <ProjectTags tags={project.tags} />
        </div>

        <div className="mt-auto pt-7">
          <ProjectActions project={project} />
        </div>
      </div>
    </motion.article>
  );
}

export default function MobileProjects() {
  const reduceMotion = useReducedMotion();

  const featured = projects.find(
    (project) => project.slug === "momentum"
  );

  const remaining = projects.filter(
    (project) => project.slug !== "momentum"
  );

  return (
    <section
      id="mobile"
      aria-labelledby="mobile-projects-heading"
      className="
        scroll-mt-8 bg-page
        px-5 pt-12 pb-24 text-neutral-950
        sm:px-8 sm:pt-16 sm:pb-28
        lg:px-12 lg:pt-20
      "
    >
      <div className="mx-auto max-w-300">
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
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
                tracking-[0.18em] text-neutral-500
                uppercase sm:text-xs
              "
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-plum"
              />
              Mobile builds
            </p>

            <span
              className="
                inline-flex items-center gap-2
                text-[10px] font-medium
                tracking-[0.14em] text-neutral-400
              "
            >
              <Smartphone size={13} aria-hidden="true" />
              {String(projects.length).padStart(2, "0")} APPS
            </span>
          </div>

          <h2
            id="mobile-projects-heading"
            className="
              font-heading mt-7
              text-[clamp(2.3rem,5.8vw,5.5rem)]
              font-normal leading-[1.02]
              tracking-[-0.045em] sm:mt-9
            "
          >
            Small screens.
            <br />
            <span className="text-plum">
              Thoughtful experiences.
            </span>
          </h2>

          <p
            className="
              mt-5 max-w-lg
              text-sm leading-relaxed
              text-neutral-600 sm:text-base
            "
          >
            Independent mobile apps—from habit tracking
            to food delivery—with the code on GitHub
            and the thinking behind each build.
          </p>
        </motion.div>

        <div className="mt-10 sm:mt-14">
          {featured && <FeaturedApp project={featured} />}

          <div className="mt-6 grid gap-6 md:grid-cols-2 sm:mt-8 sm:gap-8">
            {remaining.map((project) => (
              <MobileAppCard
                key={project.slug}
                project={project}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}