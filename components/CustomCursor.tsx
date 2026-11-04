"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const PLUM = "#5b1f5e";
const WHITE = "#ffffff";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const dotX = useSpring(rawX, {
    stiffness: 900,
    damping: 50,
    mass: 0.2,
  });

  const dotY = useSpring(rawY, {
    stiffness: 900,
    damping: 50,
    mass: 0.2,
  });

  const ringX = useSpring(rawX, {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  });

  const ringY = useSpring(rawY, {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (!isFinePointer) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const handleMove = (event: MouseEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);

      const target = event.target as HTMLElement | null;

      setHovering(
        Boolean(
          target?.closest(
            "a, button, [data-cursor='hover'], input, textarea, select"
          )
        )
      );
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    const handleMenuState = (event: Event) => {
      const detail = (event as CustomEvent<{ isOpen: boolean }>).detail;
      setMenuOpen(detail.isOpen);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("menu-orb-state", handleMenuState);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("menu-orb-state", handleMenuState);
    };
  }, [rawX, rawY]);

  if (!enabled) return null;

  const cursorColor = menuOpen ? WHITE : PLUM;

  return (
    <>
      {/* Center dot */}
      <motion.div
        aria-hidden
        // className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        className="portfolio-cursor-dot pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
        }}
        animate={{
          backgroundColor: cursorColor,
          scale: pressed ? 0.6 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25,
        }}
      />

      {/* Trailing ring */}
      <motion.div
        aria-hidden
        // className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border"
        className="portfolio-cursor-ring pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 58 : 32,
          height: hovering ? 58 : 32,
          opacity: hovering ? 0.9 : 0.55,
          scale: pressed ? 0.9 : 1,
          borderColor: cursorColor,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22,
        }}
      />
    </>
  );
}