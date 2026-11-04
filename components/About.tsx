"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDownRight } from "lucide-react";

import { skillGroups, timeline } from "@/data/projects";

const STATEMENT = [
  { text: "I'm Nnamdi, a mobile and web developer who cares about" },
  { text: "how things feel", accent: true },
  { text: "as much as how they work. I build practical products with" },
  { text: "thoughtful interactions", accent: true },
  {
    text: "—from independent mobile apps to websites people use every day.",
  },
];

const WORDS = STATEMENT.flatMap((part) =>
  part.text.split(" ").map((word) => ({
    word,
    accent: Boolean(part.accent),
  }))
);

const FULL_STATEMENT = STATEMENT.map((part) => part.text).join(" ");

function RevealWord({
  word,
  accent,
  index,
  total,
  progress,
}: {
  word: string;
  accent: boolean;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();

  const start = index / total;
  const end = Math.min((index + 1.8) / total, 1);

  const opacity = useTransform(
    progress,
    [start, end],
    [0.2, 1]
  );

  return (
    <motion.span
      style={{
        opacity: reduceMotion ? 1 : opacity,
      }}
      className={`inline-block ${
        accent ? "text-plum" : "text-neutral-950"
      }`}
    >
      {word}
    </motion.span>
  );
}

export default function About() {
  const statementRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: statementRef,
    offset: ["start 85%", "end 45%"],
  });

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="
        scroll-mt-8 bg-page
        px-5 py-20 text-neutral-950
        sm:px-8 sm:py-24
        lg:px-12 lg:py-32
      "
    >
      <div className="mx-auto max-w-300">
        {/* Section label */}
        <div
          className="
            flex items-center justify-between
            border-t border-black/10 pt-5
          "
        >
          <h2
            id="about-heading"
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
            The person behind the builds
          </h2>

          <ArrowDownRight
            size={19}
            strokeWidth={1.5}
            aria-hidden="true"
            className="shrink-0 text-plum"
          />
        </div>

        {/* Scroll-linked statement */}
        <div ref={statementRef} className="mt-10 sm:mt-14">
          <p className="sr-only">{FULL_STATEMENT}</p>

          <p
            aria-hidden="true"
            className="
              flex flex-wrap gap-x-[0.25em] gap-y-[0.08em]
              text-[clamp(1.8rem,4.2vw,3.7rem)]
              font-bold leading-[1.2]
              tracking-[-0.045em]
            "
          >
            {WORDS.map(({ word, accent }, index) => (
              <RevealWord
                key={`${word}-${index}`}
                word={word}
                accent={accent}
                index={index}
                total={WORDS.length}
                progress={scrollYProgress}
              />
            ))}
          </p>
        </div>

        {/* Skills and timeline */}
        <div
          className="
            mt-16 grid gap-14
            border-t border-black/10 pt-10
            sm:mt-20
            lg:grid-cols-[1.1fr_0.9fr]
            lg:gap-20 lg:pt-12
          "
        >
          <div>
            <h3 className="font-heading text-2xl font-normal tracking-[-0.03em] sm:text-3xl">
              What I work with.
            </h3>

            <div className="mt-7">
              {skillGroups.map((group) => (
                <motion.div
                  key={group.title}
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 14 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45 }}
                  className="
                    grid gap-3 border-b border-black/[0.07]
                    py-5 first:pt-0
                    sm:grid-cols-[120px_1fr] sm:gap-5
                  "
                >
                  <h4 className="text-sm font-semibold text-plum">
                    {group.title}
                  </h4>

                  <ul className="flex flex-wrap gap-x-3 gap-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm leading-relaxed text-neutral-600"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-2xl font-normal tracking-[-0.03em] sm:text-3xl">
              The journey so far.
            </h3>

            <ol className="mt-7">
              {timeline.map((entry, index) => (
                <motion.li
                  key={`${entry.org}-${entry.period}`}
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 14 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45 }}
                  className="
                    relative border-l border-black/10
                    pb-8 pl-6 last:pb-1
                  "
                >
                  <span
                    aria-hidden="true"
                    className={`
                      absolute top-1 left-[-4.5px]
                      size-2 rounded-full
                      ${index === 0 ? "bg-plum" : "bg-neutral-300"}
                    `}
                  />

                  <p
                    className="
                      text-[10px] font-semibold
                      tracking-[0.12em] text-neutral-500 uppercase
                    "
                  >
                    {entry.period}
                  </p>

                  <h4 className="mt-2 text-base font-bold tracking-tight">
                    {entry.role}
                  </h4>

                  <p className="mt-1 text-sm text-neutral-500">
                    {entry.org}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}