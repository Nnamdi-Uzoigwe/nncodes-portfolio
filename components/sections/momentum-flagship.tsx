"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PhoneMockup } from "@/components/ui/phone-mockup";
import { Reveal } from "@/components/ui/reveal";
import { flagship } from "@/data/projects";
import { cn } from "@/lib/utils";

const days = ["M", "T", "W", "T", "F", "S", "S"];

const blocks = [
  {
    title: "Problem",
    text: "Habits fade when progress is invisible and motivation drops.",
  },
  {
    title: "What I built",
    text: "Habit creation, daily check ins, streaks, goals and progress views.",
  },
  {
    title: "Engineering decisions",
    text: "Local first data in SQLite, typed end to end with TypeScript, and a themed design system around an Ember orange accent.",
  },
  {
    title: "Outcome",
    text: "A working MVP where everything lives on the device, so it runs fully offline.",
  },
];

function StreakRow() {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <p className="font-mono text-xs text-muted-foreground">Sample week</p>
      <div
        role="img"
        aria-label="Sample week with five completed days"
        className="mt-2 flex gap-2"
      >
        {days.map((day, i) => (
          <div key={`${day}-${i}`} className="flex flex-col items-center gap-1">
            <motion.div
              initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.3 }}
              className={cn(
                "flex size-8 items-center justify-center rounded-lg",
                i < 5
                  ? "bg-accent text-accent-foreground"
                  : "border border-border bg-muted",
              )}
            >
              {i < 5 && <Check className="size-4" aria-hidden="true" />}
            </motion.div>
            <span className="text-[10px] text-muted-foreground">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MomentumFlagship() {
  return (
    <section id="momentum" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <Reveal>
          <Card className="grid overflow-hidden p-0 md:grid-cols-[260px_1fr]">
            <div className="relative h-72 overflow-hidden bg-accent-soft md:h-auto md:min-h-[30rem]">
              <PhoneMockup
                screen={flagship.screen}
                className="absolute top-8 left-1/2 w-44 -translate-x-1/2"
              />
            </div>

            <div className="p-6 sm:p-8">
              <p className="font-mono text-sm text-accent">Flagship project</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">{flagship.name}</h2>
              <p className="mt-3 text-muted-foreground">
                A habit tracker that helps you build consistency through daily
                goals, streaks and progress you can actually see.
              </p>

              <div className="mt-6">
                <StreakRow />
              </div>

              <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                {blocks.map((block) => (
                  <div key={block.title}>
                    <dt className="text-sm font-medium">{block.title}</dt>
                    <dd className="mt-1 text-sm text-muted-foreground">
                      {block.text}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={`/work/${flagship.slug}`}
                  icon={ArrowUpRight}
                  iconPosition="right"
                >
                  Read the case study
                </Button>
                {flagship.github && (
                  <Button href={flagship.github} variant="secondary" icon={Code}>
                    GitHub
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}