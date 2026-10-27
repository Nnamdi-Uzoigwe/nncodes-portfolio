import { ImageIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { timeline } from "@/data/projects";

function PolaroidPlaceholder({
  caption,
  className,
}: {
  caption: string;
  className: string;
}) {
  return (
    <div
      className={`absolute w-36 rounded-card border border-border bg-card p-2 shadow-sm ${className}`}
    >
      <div className="flex aspect-[4/5] items-center justify-center rounded-lg bg-muted">
        <ImageIcon
          className="size-6 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
      <p className="mt-2 text-center text-[10px] text-muted-foreground">
        {caption}
      </p>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 sm:grid-cols-[1fr_220px] sm:items-start">
          <div>
            <SectionHeading eyebrow="About" title="A bit about me" />
            <Reveal delay={0.05}>
              <p className="mt-5 text-muted-foreground">
                I&apos;m a mobile app developer based in Abuja, Nigeria. I build
                React Native apps, along with the backends behind them, for
                businesses, startups and founders who want an idea turned into
                something people use.
              </p>
              <p className="mt-4 text-muted-foreground">
                I graduated in Computer Science from the University of Calabar
                in 2025, and I share what I learn building apps as coding
                content on TikTok.
              </p>
            </Reveal>
          </div>

          {/* <Reveal delay={0.1}>
            <div
              className="relative mx-auto h-64 w-full max-w-[220px]"
              aria-hidden="true"
            >
              <PolaroidPlaceholder
                caption="Workspace"
                className="top-0 left-0 -rotate-6"
              />
              <PolaroidPlaceholder
                caption="Building"
                className="right-0 bottom-0 rotate-3"
              />
            </div>
          </Reveal> */}
        </div>

        <Reveal className="mt-12">
          <ul className="divide-y divide-border border-y border-border">
            {timeline.map((item) => (
              <li
                key={item.role}
                className="flex flex-col gap-1.5 py-4 sm:flex-row sm:items-center sm:gap-6"
              >
                <span className="w-24 shrink-0 font-mono text-xs text-muted-foreground">
                  {item.period}
                </span>
                <span className="flex-1 text-sm font-medium">{item.role}</span>
                <Tag className="self-start sm:self-auto">{item.org}</Tag>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}