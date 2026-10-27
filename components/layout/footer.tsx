import { ArrowUp, ArrowUpRight, Download, Mail } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

const linkClass =
  "inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground";

function InternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  const isMail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
      className={linkClass}
    >
      {children}
      <ArrowUpRight className="size-3.5" aria-hidden="true" />
    </a>
  );
}

export function Footer() {
  // const year = new Date().getFullYear();
  const year = 2026;

  return (
    <footer className="mt-24 border-t border-border pt-16 pb-8">
      <Container>
        <Card className="p-8 sm:p-10">
          <p className="font-mono text-sm text-accent">Open to new projects</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">
            Have an app idea? Let&apos;s build it.
          </h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            I work with businesses, startups and founders to take mobile apps
            from idea to something people use.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={`mailto:${siteConfig.email}`} icon={Mail}>
              Start a project
            </Button>
            <Button href="/cv.pdf" variant="secondary" icon={Download}>
              Download CV
            </Button>
          </div>
        </Card>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          <div>
            <p className="text-sm font-medium">Navigate</p>
            <ul className="mt-4 space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <InternalLink href={item.href}>{item.label}</InternalLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium">Projects</p>
            <ul className="mt-4 space-y-3">
              {siteConfig.projects.map((project) => (
                <li key={project.slug}>
                  <InternalLink href={`/work/${project.slug}`}>
                    {project.name}
                  </InternalLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium">Connect</p>
            <ul className="mt-4 space-y-3">
              <li>
                <ExternalLink href={siteConfig.socials.github}>GitHub</ExternalLink>
              </li>
              <li>
                <ExternalLink href={siteConfig.socials.linkedin}>
                  LinkedIn
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={siteConfig.socials.tiktok}>TikTok</ExternalLink>
              </li>
              <li>
                <ExternalLink href={`mailto:${siteConfig.email}`}>Email</ExternalLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {year} {siteConfig.name}. Built with Next.js.
          </p>
          <Button href="#top" variant="ghost" size="sm" icon={ArrowUp}>
            Back to top
          </Button>
        </div>
      </Container>
    </footer>
  );
}