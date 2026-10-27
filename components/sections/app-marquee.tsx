"use client";

import { useAnimationFrame, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { PhoneMockup } from "@/components/ui/phone-mockup";
import type { AppScreen } from "@/data/screens";
import { cn } from "@/lib/utils";

const SPEED = 36; // pixels per second
const MAX_SCALE = 1.12;
const MIN_SCALE = 0.86;
const COPIES = 3;

export function AppMarquee({ screens }: { screens: AppScreen[] }) {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metrics = useRef({ loop: 0, width: 0, centers: [] as number[] });
  const offset = useRef(0);
  const hovered = useRef(false);
  const inView = useRef(true);
  const [ready, setReady] = useState(false);
  const count = screens.length;

  const apply = useCallback(() => {
    const { loop, width, centers } = metrics.current;
    const track = trackRef.current;
    if (!loop || !track) return;

    track.style.transform = `translate3d(${-offset.current}px, 0, 0)`;

    const mid = width / 2;
    for (let i = 0; i < centers.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;
      const distance = Math.min(
        Math.abs(centers[i] - offset.current - mid) / mid,
        1,
      );
      const scale = MAX_SCALE - distance * (MAX_SCALE - MIN_SCALE);
      el.style.transform = `scale(${scale.toFixed(3)})`;
    }
  }, []);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const items = itemRefs.current;
    const first = items[0];
    const secondSetFirst = items[count];
    if (!viewport || !first || !secondSetFirst) return;

    metrics.current = {
      loop: secondSetFirst.offsetLeft - first.offsetLeft,
      width: viewport.clientWidth,
      centers: items
        .slice(0, count * COPIES)
        .map((el) => (el ? el.offsetLeft + el.offsetWidth / 2 : 0)),
    };
  }, [count]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    measure();
    const { loop, width, centers } = metrics.current;
    if (loop) {
      const start = centers[Math.floor(count / 2)] - width / 2;
      offset.current = ((start % loop) + loop) % loop;
    }
    apply();
    setReady(true);

    const resize = new ResizeObserver(() => {
      measure();
      if (metrics.current.loop) offset.current %= metrics.current.loop;
      apply();
    });
    resize.observe(viewport);

    const visibility = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
    });
    visibility.observe(viewport);

    return () => {
      resize.disconnect();
      visibility.disconnect();
    };
  }, [apply, measure, count]);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || hovered.current || !inView.current) return;
    const { loop } = metrics.current;
    if (!loop) return;
    offset.current =
      (offset.current + (SPEED * Math.min(delta, 50)) / 1000) % loop;
    apply();
  });

  return (
    <div
      ref={viewportRef}
      role="region"
      aria-label="Preview of apps I have built"
      onMouseEnter={() => {
        hovered.current = true;
      }}
      onMouseLeave={() => {
        hovered.current = false;
      }}
      className={cn(
        "relative w-full overflow-hidden py-12 transition-opacity duration-700 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        ready ? "opacity-100" : "opacity-0",
      )}
    >
      <div
        ref={trackRef}
        className="relative flex w-max items-center gap-5 will-change-transform sm:gap-6"
      >
        {Array.from({ length: COPIES }).flatMap((_, copy) =>
          screens.map((screen, i) => {
            const index = copy * count + i;
            return (
              <div
                key={`${copy}-${screen.slug}-${screen.label}`}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                aria-hidden={copy > 0}
                className="w-[148px] shrink-0 will-change-transform sm:w-[176px]"
              >
                <PhoneMockup screen={screen} priority={copy === 0 && i < 4} />
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}