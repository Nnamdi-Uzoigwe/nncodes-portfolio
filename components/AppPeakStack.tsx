
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const APPS = [
  {
    id: "momentum",
    name: "Momentum",
    category: "Habit tracker",
    image: "/projects/momentum.png",
  },
  {
    id: "novara",
    name: "Novara",
    category: "E-commerce",
    image: "/projects/novara.png",
  },
  {
    id: "bobo",
    name: "Bobo",
    category: "Mobile app",
    image: "/projects/bobo.png",
  },
  {
    id: "scanly",
    name: "Scanly",
    category: "Utility app",
    image: "/projects/scanly.png",
  },
];

type App = (typeof APPS)[number];

const POSES = [
  { x: 0, y: 0, rotate: -3, scale: 1 },
  { x: 30, y: 22, rotate: 6, scale: 0.96 },
  { x: -26, y: 36, rotate: -10, scale: 0.92 },
];

function AppScreen({ app }: { app: App }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <Image
        src={app.image}
        alt={`${app.name} app interface`}
        fill
        unoptimized
        sizes="(min-width: 1024px) 280px, 240px"
        className="pointer-events-none object-cover object-top"
        draggable={false}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export default function AppPeekStack() {
  const ref = useRef<HTMLDivElement>(null);
  const entered = useInView(ref, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();

  const [index, setIndex] = useState(0);

  const next = () => setIndex((current) => (current + 1) % APPS.length);

  const previous = () =>
    setIndex((current) => (current - 1 + APPS.length) % APPS.length);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -55 || info.velocity.x < -450) {
      next();
    } else if (info.offset.x > 55 || info.velocity.x > 450) {
      previous();
    }
  };

  const visibleApps = Array.from({ length: 3 }, (_, position) => ({
    app: APPS[(index + position) % APPS.length],
    position,
  }));

  return (
    <div ref={ref} className="relative w-full">
      {/* Controls sit outside the cropped preview */}
      <div className="mx-auto mb-5 flex max-w-[340px] items-center justify-between px-4">
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm font-semibold tracking-tight">
            {APPS[index].name}
          </p>

          <p className="mt-0.5 text-[11px] text-neutral-500">
            Mobile build / {String(index + 1).padStart(2, "0")}
            <span className="mx-1.5 text-neutral-300">—</span>
            {String(APPS.length).padStart(2, "0")}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={previous}
            aria-label="Show previous app"
            className="flex size-9 items-center justify-center rounded-full border border-black/10 bg-white text-[#5b1f5e] transition hover:bg-[#f4eef5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5b1f5e] active:scale-95 dark:border-white/15 dark:bg-neutral-950 dark:text-white"
          >
            <ArrowLeft size={15} />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Show next app"
            className="flex size-9 items-center justify-center rounded-full bg-[#5b1f5e] text-white transition hover:bg-[#421645] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5b1f5e] active:scale-95"
          >
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* The crop is the key to the peeking effect */}
      <div className="relative h-[290px] overflow-hidden pt-8 lg:h-[320px]">
        <motion.div
          initial={reduceMotion ? false : { y: 150, opacity: 0 }}
          animate={{
            y: entered ? 0 : 150,
            opacity: entered ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 22,
          }}
          className="relative mx-auto h-[510px] w-[240px] lg:w-[280px]"
        >
          {/* Reverse render order: front card remains above the others */}
          {[...visibleApps].reverse().map(({ app, position }) => {
            const pose = POSES[position];
            const front = position === 0;

            return (
              <motion.div
                key={app.id}
                initial={false}
                animate={
                  entered
                    ? pose
                    : { x: 0, y: 30, rotate: 0, scale: 0.95 }
                }
                transition={{
                  type: "spring",
                  stiffness: 170,
                  damping: 24,
                }}
                drag={front && !reduceMotion ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.55}
                dragSnapToOrigin
                onDragEnd={front ? handleDragEnd : undefined}
                whileDrag={{ scale: 1.025 }}
                style={{
                  zIndex: 3 - position,
                  touchAction: "pan-y",
                  transformOrigin: "50% 85%",
                }}
                className={`absolute inset-0 overflow-hidden rounded-2xl shadow-[0_12px_35px_-12px_rgba(40,15,42,0.28)] ${
                  front
                    ? "cursor-grab active:cursor-grabbing"
                    : "pointer-events-none"
                }`}
              >
                <AppScreen app={app} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}