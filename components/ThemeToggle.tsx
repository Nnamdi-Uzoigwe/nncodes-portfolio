"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      disabled={!mounted}
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="
        inline-flex items-center gap-2 rounded-[14px]
        border border-white/30 px-4 py-3
        text-sm font-semibold text-white
        transition hover:bg-white/10 active:scale-95
        disabled:opacity-50
      "
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
      {dark ? "Light" : "Dark"}
    </button>
  );
}