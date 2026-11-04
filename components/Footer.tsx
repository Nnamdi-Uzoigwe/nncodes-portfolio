import { ArrowUpRight, ArrowUp } from "lucide-react";

import { site } from "@/data/site";

const socials = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "TikTok", href: site.tiktok },
  { label: "X", href: site.x },
].filter((social) => Boolean(social.href));

export default function Footer() {
  return (
    <footer
      data-cursor-light
      className="bg-[#5b1f5e] px-5 text-white sm:px-8 lg:px-12"
    >
      <div
        className="
          mx-auto max-w-[1200px]
          border-t border-white/20 pt-8 pb-10
        "
      >
        <div
          className="
            flex flex-col gap-8
            sm:flex-row sm:items-center sm:justify-between
            sm:pr-24
          "
        >
          <nav aria-label="Social links">
            <ul className="flex flex-wrap gap-x-6 gap-y-4">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group inline-flex items-center gap-1
                      text-xs font-semibold text-white/75
                      transition-colors hover:text-white
                      focus-visible:outline-2
                      focus-visible:outline-offset-4
                      focus-visible:outline-white
                    "
                  >
                    {social.label}
                    <ArrowUpRight
                      size={13}
                      aria-hidden="true"
                      className="
                        transition-transform
                        group-hover:-translate-y-0.5
                        motion-reduce:transform-none
                      "
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#home"
            className="
              inline-flex w-fit items-center gap-2
              text-xs font-semibold text-white/75
              transition-colors hover:text-white
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-white
            "
          >
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>

        <div
          className="
            mt-10 flex flex-col gap-2 pr-24
            text-[10px] leading-relaxed text-white/50
            sm:mt-12 sm:flex-row sm:justify-between
          "
        >
          <p>
            © 2026 {site.name}
          </p>

          <p>Built with care. Refined through iteration.</p>
        </div>
      </div>
    </footer>
  );
}