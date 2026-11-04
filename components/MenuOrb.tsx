"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Moon, Sun, X } from "lucide-react";
import { useLenis } from "lenis/react";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname, useRouter } from "next/navigation";

const PLUM = "#5b1f5e";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

// Orb center: 16px edge offset + 36px half-width.
const ORIGIN = "calc(100% - 52px) calc(100% - 52px)";
const CLOSED = `circle(0px at ${ORIGIN})`;
const OPEN = `circle(2400px at ${ORIGIN})`;

function dispatchMenuState(isOpen: boolean) {
  window.dispatchEvent(
    new CustomEvent("menu-orb-state", {
      detail: { isOpen },
    })
  );
}

export default function MenuOrb() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [showPointer, setShowPointer] = useState(true);
  const pathname = usePathname();
const router = useRouter();

  const lenis = useLenis();

  const { scrollYProgress } = useScroll();

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Track the section currently near the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = SECTIONS.findIndex(
            (section) => section.id === entry.target.id
          );

          if (index !== -1) {
            setActive(index);
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
      }
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Hide the pointer after a while, or immediately after first interaction.
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPointer(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  // Lock scroll while menu is open; close on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        dispatchMenuState(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const toggleMenu = () => {
    const nextState = !open;

    setOpen(nextState);
    dispatchMenuState(nextState);

    if (nextState) {
      setShowPointer(false);
    }
  };

  const goTo = (id: string) => {
  setOpen(false);
  dispatchMenuState(false);

  if (pathname !== "/") {
    router.push(`/#${id}`);
    return;
  }

  window.setTimeout(() => {
    const target = document.getElementById(id);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, 700);
};

  return (
    <>
      {/* Full-screen expanding menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu-overlay"
            initial={{ clipPath: CLOSED }}
            animate={{ clipPath: OPEN }}
            exit={{ clipPath: CLOSED }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{ backgroundColor: PLUM }}
            className="fixed inset-0 z-50 flex flex-col justify-between px-6 pt-8 pb-28 text-white"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="text-sm font-medium opacity-80"
            >
              Nnamdi Uzoigwe
            </motion.p>

            <nav>
              <ul className="space-y-1">
                {SECTIONS.map((section, index) => (
                  <motion.li
                    key={section.id}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      transition: {
                        delay: 0.25 + index * 0.07,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.1 },
                    }}
                  >
                    <button
                      onClick={() => goTo(section.id)}
                      className={`font-display flex items-baseline gap-3 text-left text-[3.5rem] leading-[1.05] font-extrabold tracking-[-0.03em] transition-opacity ${
                        active === index ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      <span className="text-sm font-medium tracking-normal opacity-70">
                        0{index + 1}
                      </span>
                      {section.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.55 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="flex items-center gap-3"
            >
              <ThemeToggle />

              <a
                href="https://www.tiktok.com/@yourhandle"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[14px] border border-white/30 px-4 py-3 text-sm font-semibold transition active:scale-95"
              >
                TikTok
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* One-time straight pointer: desktop */}
      <AnimatePresence>
        {showPointer && !open && (
          <motion.div
            key="orb-pointer-desktop"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.35 } }}
            transition={{ delay: 1.3, duration: 0.45 }}
            className="pointer-events-none fixed right-24 bottom-20 z-60 hidden sm:block"
          >
            <div className="flex items-end gap-2">
              <motion.span
                className="font-body text-xs font-semibold tracking-wide text-plum"
                animate={{ opacity: [1, 0.45, 1] }}
                transition={{
                  delay: 2.3,
                  duration: 1.4,
                  repeat: 2,
                  repeatType: "reverse",
                }}
              >
                Click me!
              </motion.span>

              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                className="text-plum"
              >
                <motion.line
                  x1="8"
                  y1="8"
                  x2="48"
                  y2="48"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    delay: 1.4,
                    duration: 0.6,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                />

                <motion.path
                  d="M34 48L49 49L48 34"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    delay: 1.9,
                    duration: 0.35,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* One-time straight pointer: mobile */}
      <AnimatePresence>
        {showPointer && !open && (
          <motion.div
            key="orb-pointer-mobile"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6, transition: { duration: 0.3 } }}
            transition={{ delay: 1.3, duration: 0.45 }}
            className="pointer-events-none fixed right-20 bottom-24 z-60 sm:hidden"
          >
            <div className="flex flex-col items-end gap-1">
              <motion.span
                className="font-body text-[11px] font-semibold text-plum"
                animate={{ opacity: [1, 0.45, 1] }}
                transition={{
                  delay: 2.2,
                  duration: 1.3,
                  repeat: 2,
                  repeatType: "reverse",
                }}
              >
                Click me!
              </motion.span>

              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                className="text-plum"
              >
                <motion.line
                  x1="6"
                  y1="6"
                  x2="28"
                  y2="28"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                />

                <motion.path
                  d="M19 28L29 29L28 19"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.8, duration: 0.3 }}
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orb */}
      {/* <div className="fixed right-4 bottom-4 z-[60] h-[72px] w-[72px]"> */}
      <div
  data-menu-orb
  className="fixed right-4 bottom-4 z-60 h-18 w-18"
>
        <svg viewBox="0 0 72 72" className="absolute inset-0 -rotate-90">
          <circle
            cx="36"
            cy="36"
            r="33"
            fill="none"
            strokeWidth="3"
            style={{
              stroke: open
                ? "rgba(255,255,255,0.25)"
                : "rgba(91,31,94,0.15)",
            }}
            className="transition-[stroke] duration-500"
          />

          <motion.circle
            cx="36"
            cy="36"
            r="33"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              pathLength,
              stroke: open ? "#ffffff" : PLUM,
            }}
          />
        </svg>

        <motion.button
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          animate={{
            backgroundColor: open ? "#ffffff" : PLUM,
            color: open ? PLUM : "#ffffff",
          }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="absolute inset-2 flex items-center justify-center rounded-full text-sm font-bold shadow-lg"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key={active}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                0{active + 1}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}