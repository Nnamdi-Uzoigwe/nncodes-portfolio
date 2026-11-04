"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const PLUM = "#5b1f5e";

function MagneticButton({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 250, damping: 18 });
  const y = useSpring(rawY, { stiffness: 250, damping: 18 });

  const handleMove = (event: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    rawX.set((event.clientX - centerX) * 0.22);
    rawY.set((event.clientY - centerY) * 0.22);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-[14px] px-6 py-4 text-sm font-semibold transition-colors active:scale-[0.97]";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={
        variant === "primary"
          ? `${base} text-white`
          : `${base} border border-black/15 text-black`
      }
    >
      {variant === "primary" && (
        <>
          <span
            className="absolute inset-0 bg-black transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0"
            style={{ transform: "translateY(101%)" }}
          />
          <span
            className="absolute inset-0 transition-colors duration-500"
            style={{ backgroundColor: PLUM }}
          />
        </>
      )}

      <span className="relative z-10 flex items-center gap-2.5">
        {children}
      </span>
    </motion.a>
  );
}

export default function HeroCTA() {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <MagneticButton href="#work" variant="primary">
        See my work
        <ArrowUpRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </MagneticButton>

      <MagneticButton href="#contact" variant="secondary">
        Let’s talk
        <MessageCircle
          size={18}
          className="transition-transform duration-300 group-hover:rotate-12"
        />
      </MagneticButton>
    </div>
  );
}