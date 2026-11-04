"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download, MessageCircle } from "lucide-react";

import { site } from "@/data/site";

export default function Contact() {
  const reduceMotion = useReducedMotion();

  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const copyEmail = async () => {
    if (!site.email) return;

    if (resetTimer.current) clearTimeout(resetTimer.current);

    try {
      await navigator.clipboard.writeText(site.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }

    resetTimer.current = setTimeout(() => {
      setCopyState("idle");
    }, 3000);
  };

  const whatsappUrl = site.whatsappNumber
  ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
      site.whatsappMessage
    )}`
  : "";

  return (
    <section
      id="contact"
      data-cursor-light
      aria-labelledby="contact-heading"
      className="
        relative scroll-mt-0 overflow-hidden
        bg-plum px-5 pt-16 pb-14 text-white
        sm:px-8 sm:pt-20 sm:pb-20
        lg:px-12 lg:pt-24
      "
    >
      <div className="mx-auto max-w-300">
        <div
          className="
            flex flex-wrap items-center justify-between
            gap-4 border-b border-white/20 pb-5
          "
        >
          <p
            className="
              text-[10px] font-semibold
              tracking-[0.18em] text-white/65 uppercase
              sm:text-xs
            "
          >
            Have something in mind?
          </p>

          <span className="inline-flex items-center gap-2 text-xs text-white/80">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-[#d9f3c2]"
            />
            Available for projects
          </span>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-10 sm:mt-14"
        >
          <h2
            id="contact-heading"
            className="
              font-heading max-w-5xl
              text-[clamp(2.7rem,7.8vw,7.5rem)]
              font-normal leading-[1.02]
              tracking-[-0.045em]
            "
          >
            Let's make
            <br />
            something
            <br className="sm:hidden" />{" "}
            <span className="text-[#e5c7e7]">real.</span>
          </h2>

          <p className="mt-7 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
            A mobile app, a website, or an idea you’re ready to build. Tell me
            what you have in mind.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
  <a
    href="/documents/nnamdi-uzoigwe-cv.pdf"
    download="Nnamdi-Uzoigwe-CV.pdf"
    className="
      group inline-flex items-center gap-3
      rounded-full border border-white/30
      px-5 py-3 text-sm font-semibold text-white
      transition-colors duration-300
      hover:border-white/60 hover:bg-white/10
      focus-visible:outline-2
      focus-visible:outline-offset-4
      focus-visible:outline-white
      active:scale-[0.98]
    "
  >
    Download CV

    <Download
      size={16}
      aria-hidden="true"
      className="
        transition-transform duration-300
        group-hover:translate-y-0.5
        motion-reduce:transform-none
      "
    />
  </a>

  {whatsappUrl && (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Nnamdi on WhatsApp in a new tab"
      className="
        group inline-flex items-center gap-3
        rounded-full border border-white/30
        px-5 py-3 text-sm font-semibold text-white
        transition-colors duration-300
        hover:border-white/60 hover:bg-white/10
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-white
        active:scale-[0.98]
      "
    >
      <MessageCircle size={17} aria-hidden="true" />

      WhatsApp me

      <ArrowUpRight
        size={15}
        aria-hidden="true"
        className="
          transition-transform duration-300
          group-hover:translate-x-0.5
          group-hover:-translate-y-0.5
          motion-reduce:transform-none
        "
      />
    </a>
  )}
</div>
        </motion.div>

        {site.email ? (
          <div
            className="
              mt-10 flex flex-col gap-5
              sm:mt-14 sm:flex-row sm:items-center
              sm:justify-between
            "
          >
            <a
              href={`mailto:${site.email}`}
              className="
                group inline-flex min-w-0 items-center gap-4
                self-start border-b border-white/40 pb-4
                transition-colors hover:border-white
                focus-visible:outline-2
                focus-visible:outline-offset-8
                focus-visible:outline-white
              "
            >
              <span
                className="
                  break-all text-[clamp(1.1rem,3vw,2.3rem)]
                  font-semibold tracking-[-0.035em]
                "
              >
                {site.email}
              </span>

              <span
                className="
                  flex size-11 shrink-0 items-center
                  justify-center rounded-full
                  bg-white text-plum
                  transition-transform duration-300
                  group-hover:-rotate-12
                  motion-reduce:transform-none
                  sm:size-14
                "
              >
                <ArrowUpRight size={23} aria-hidden="true" />
              </span>
            </a>

            <div>
              <button
                type="button"
                onClick={copyEmail}
                className="
                  inline-flex items-center gap-2
                  rounded-full border border-white/25
                  px-4 py-2.5 text-xs font-semibold
                  text-white/85 transition-colors
                  hover:bg-white/10
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-white
                "
              >
                {copyState === "copied" ? (
                  <Check size={14} aria-hidden="true" />
                ) : (
                  <Copy size={14} aria-hidden="true" />
                )}

                {copyState === "copied" ? "Copied!" : "Copy email"}
              </button>

              <p role="status" className="mt-2 min-h-4 text-xs text-white/70">
                {copyState === "error"
                  ? "Couldn’t copy. You can select the address instead."
                  : copyState === "copied"
                    ? "Email address copied."
                    : ""}
              </p>
            </div>
          </div>
        ) : (
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-10 inline-flex items-center gap-3
              border-b border-white/40 pb-3
              text-sm font-semibold
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-white
            "
          >
            Find me on GitHub
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        )}
      </div>
    </section>
  );
}
