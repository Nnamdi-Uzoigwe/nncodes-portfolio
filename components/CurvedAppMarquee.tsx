"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";

import { projects } from "@/data/projects";

const COPIES = 3;
const SPEED = 28; // Pixels per second

export default function CurvedAppMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    pausedRef.current = paused || hovered || focused;
  }, [paused, hovered, focused]);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const syncPreference = () => {
      reducedMotionRef.current = media.matches;
      setReducedMotion(media.matches);
    };

    syncPreference();
    media.addEventListener("change", syncPreference);

    return () => {
      media.removeEventListener("change", syncPreference);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    const groups = Array.from(
      track.querySelectorAll<HTMLElement>("[data-marquee-group]")
    );

    const slots = Array.from(
      track.querySelectorAll<HTMLElement>("[data-marquee-slot]")
    );

    let containerWidth = 0;
    let groupWidth = 0;
    let itemStep = 0;
    let cardWidth = 0;

    let frame = 0;
    let previousTime = 0;
    let visible = true;

    const measure = () => {
      containerWidth = container.clientWidth;
      groupWidth = groups[0]?.offsetWidth ?? 0;
      cardWidth = slots[0]?.offsetWidth ?? 0;

      const first = slots[0];
      const second = slots[1];

      itemStep =
        first && second
          ? second.offsetLeft - first.offsetLeft
          : cardWidth;

      if (groupWidth > 0) {
        offsetRef.current %= groupWidth;
      }
    };

    const resizeObserver = new ResizeObserver(measure);

    resizeObserver.observe(container);

    if (groups[0]) {
      resizeObserver.observe(groups[0]);
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        previousTime = 0;
      },
      { rootMargin: "100px" }
    );

    intersectionObserver.observe(container);
    measure();

    const animate = (time: number) => {
      const elapsed = previousTime
        ? Math.min((time - previousTime) / 1000, 0.05)
        : 0;

      previousTime = time;

      if (
        visible &&
        groupWidth > 0 &&
        !reducedMotionRef.current
      ) {
        if (!pausedRef.current) {
          offsetRef.current =
            (offsetRef.current + SPEED * elapsed) % groupWidth;
        }

        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

        slots.forEach((slot, index) => {
          const inner =
            slot.querySelector<HTMLElement>("[data-marquee-inner]");

          if (!inner) return;

          const groupIndex = Math.floor(index / projects.length);
          const itemIndex = index % projects.length;

          const center =
            groupIndex * groupWidth +
            itemIndex * itemStep +
            cardWidth / 2 -
            offsetRef.current;

          const distance = Math.max(
            -1.15,
            Math.min(
              1.15,
              (center - containerWidth / 2) /
                Math.max(containerWidth / 2, 1)
            )
          );

          const edge = Math.abs(distance);

          // A shallow concave curve:
          // center recedes slightly; outer phones turn inward.
          const scale = 0.9 + edge * 0.08;
          const rotateY = -distance * 12;
          const translateY = edge * -12;

          inner.style.transform = `
            perspective(1100px)
            translateY(${translateY}px)
            rotateY(${rotateY}deg)
            scale(${scale})
          `;
        });
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative mt-12 sm:mt-16">
      {/* Showcase header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-plum dark:bg-[#d5a4db]"
          />

          <p className="text-[9px] font-semibold tracking-[0.16em] text-neutral-500 uppercase sm:text-[10px]">
            A few things I’ve built
          </p>
        </div>

        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((current) => !current)}
            aria-label={
              paused ? "Play app showcase" : "Pause app showcase"
            }
            aria-pressed={paused}
            className="
              inline-flex items-center gap-2
              rounded-full border border-black/10
              px-3 py-2 text-[10px] font-semibold
              text-neutral-500 transition
              hover:text-plum
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-plum
              dark:border-white/15
            "
          >
            {paused ? (
              <Play size={12} aria-hidden="true" />
            ) : (
              <Pause size={12} aria-hidden="true" />
            )}

            {paused ? "Play" : "Pause"}
          </button>
        )}
      </div>

      {/* Static, scrollable alternative for reduced motion */}
      {reducedMotion ? (
        <div
          className="
            flex snap-x snap-mandatory gap-5
            overflow-x-auto px-4 py-5
          "
          aria-label="Mobile app projects"
        >
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="
                w-42.5 shrink-0 snap-center rounded-xl
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-plum
                sm:w-52.5
              "
            >
              <div className="relative h-75 sm:h-87.5">
                <Image
                  src={project.screen}
                  alt={`${project.name} app preview`}
                  fill
                  unoptimized
                  sizes="210px"
                  className="object-contain"
                />
              </div>

              <p className="mt-3 text-center text-xs font-semibold">
                {project.name}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div
          ref={containerRef}
          className="hero-app-marquee relative overflow-hidden py-6 sm:py-8"
          aria-label="Mobile app project previews"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget as Node | null
              )
            ) {
              setFocused(false);
            }
          }}
        >
          <div
            ref={trackRef}
            className="flex w-max will-change-transform"
          >
            {Array.from({ length: COPIES }, (_, copy) => (
              <div
                key={copy}
                data-marquee-group
                aria-hidden={copy > 0 ? true : undefined}
                className="
                  relative flex shrink-0
                  gap-6 pr-6
                  sm:gap-10 sm:pr-10
                "
              >
                {projects.map((project) => (
                  <div
                    key={`${copy}-${project.slug}`}
                    data-marquee-slot
                    className="w-42.5 shrink-0 sm:w-55 lg:w-62.5"
                  >
                    <div
                      data-marquee-inner
                      className="will-change-transform"
                      style={{
                        transformOrigin: "50% 70%",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <Link
                        href={`/projects/${project.slug}`}
                        tabIndex={copy === 0 ? 0 : -1}
                        aria-label={`Explore ${project.name}`}
                        className="
                          group block rounded-2xl
                          focus-visible:outline-2
                          focus-visible:outline-offset-4
                          focus-visible:outline-plum
                        "
                      >
                        {/* The image already includes its iPhone frame */}
                        <div className="relative h-75 sm:h-92.5 lg:h-102.5">
                          <Image
                            src={project.screen}
                            alt={`${project.name} app preview`}
                            fill
                            unoptimized
                            sizes="250px"
                            draggable={false}
                            className="
                              pointer-events-none select-none
                              object-contain
                              drop-shadow-[0_12px_16px_rgba(35,20,40,0.12)]
                            "
                          />
                        </div>

                        <div className="mt-4 text-center">
                          <p className="text-xs font-bold tracking-tight">
                            {project.name}
                          </p>

                          <p className="mt-1 text-[10px] text-neutral-500">
                            {project.tagline}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}