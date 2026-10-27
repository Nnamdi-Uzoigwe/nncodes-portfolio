"use client";

import { ArrowUpRight, Briefcase, Check, Code, Copy, Mail, Video } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site";

const links = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "Connect with me",
    href: siteConfig.socials.linkedin,
    icon: Briefcase,
  },
  {
    label: "GitHub",
    value: "See my code",
    href: siteConfig.socials.github,
    icon: Code,
  },
  {
    label: "TikTok",
    value: "Watch me build",
    href: siteConfig.socials.tiktok,
    icon: Video,
  },
];

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button variant="secondary" icon={copied ? Check : Copy} onClick={copy}>
      {copied ? "Copied" : "Copy email"}
    </Button>
  );
}

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Tell me about your app idea. I reply to every message."
        />

        <Reveal className="mt-6 flex flex-wrap gap-3">
          <Button href={`mailto:${siteConfig.email}`} icon={Mail}>
            Send an email
          </Button>
          <CopyEmail />
        </Reveal>

        <Reveal className="mt-8 grid gap-3 sm:grid-cols-2">
          {links.map((link) => {
            const isMail = link.href.startsWith("mailto:");
            return (
              <a
                key={link.label}
                href={link.href}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                className="group flex items-center gap-3 rounded-card border border-border bg-card p-4 transition-colors duration-200 hover:border-foreground/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-button bg-muted">
                  <link.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{link.label}</span>
                  <span className="block truncate text-sm text-muted-foreground">
                    {link.value}
                  </span>
                </span>
                <ArrowUpRight
                  className="size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}