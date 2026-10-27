"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const sectionIds = siteConfig.nav.map((item) => item.href.split("#")[1]);

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 120 && !open);
  });

  useEffect(() => {
    if (pathname !== "/") return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const active = pathname.startsWith("/work")
    ? "work"
    : pathname.startsWith("/web")
      ? "web"
      : pathname === "/"
        ? activeSection
        : null;

  return (
    <motion.header
      animate={{ y: hidden ? "-120%" : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-x-0 top-3 z-50"
    >
      <Container>
        <nav
          aria-label="Main"
          className="rounded-card border border-border bg-background/80 backdrop-blur-md"
        >
          <div className="flex h-14 items-center justify-between pr-2 pl-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <span
                className="size-2 rounded-full bg-accent"
                aria-hidden="true"
              />
              {siteConfig.shortName}
            </Link>

            <ul className="hidden items-center gap-1 md:flex">
              {siteConfig.nav.map((item) => {
                const id = item.href.split("#")[1];
                const isActive = active === id;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative block px-3 py-2 text-sm transition-colors duration-200",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                href="/#contact"
                size="sm"
                icon={Mail}
                className="hidden sm:inline-flex"
              >
                Let&apos;s talk
              </Button>
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="inline-flex size-9 items-center justify-center rounded-button border border-border text-foreground transition-colors duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
              >
                {open ? (
                  <X className="size-4" aria-hidden="true" />
                ) : (
                  <Menu className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden md:hidden"
              >
                <ul className="border-t border-border px-4 py-2">
                  {siteConfig.nav.map((item) => (
                    <li
                      key={item.href}
                      className="border-b border-border last:border-b-0"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block py-3 text-base"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="px-4 pt-1 pb-4">
                  <Button
                    href="/#contact"
                    icon={Mail}
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Let&apos;s talk
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </Container>
    </motion.header>
  );
}