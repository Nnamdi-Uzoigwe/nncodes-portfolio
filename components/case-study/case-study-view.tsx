import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code,
  Play,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PhoneMockup } from "@/components/ui/phone-mockup";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import type { CaseStudy } from "@/data/case-studies";
import type { Project } from "@/data/projects";
import { getScreens } from "@/data/screens";
import { cn } from "@/lib/utils";

type CaseStudyViewProps = {
  project: Project;
  study: CaseStudy;
  next: Project;
};

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal className="mt-16">
      <h2 className="text-2xl sm:text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </Reveal>
  );
}

export function CaseStudyView({ project, study, next }: CaseStudyViewProps) {
  const screens = getScreens(project.slug);

  return (
    <article className="pt-28 pb-8 sm:pt-32">
      <Container>
        <Button href="/#work" variant="ghost" size="sm" icon={ArrowLeft}>
          All work
        </Button>

        <Reveal className="mt-6">
          <p className="font-mono text-sm text-accent">{project.status}</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-6xl">
            {project.name}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {project.tagline}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <dl className="mt-8 grid gap-5 border-y border-border py-5 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-xs text-muted-foreground">
                Platform
              </dt>
              <dd className="mt-1 text-sm">{study.platform}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-muted-foreground">
                Status
              </dt>
              <dd className="mt-1 text-sm">{project.status}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-muted-foreground">
                Built for
              </dt>
              <dd className="mt-1 text-sm">{study.audience}</dd>
            </div>
          </dl>

          {(project.github || project.demo) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.github && (
                <Button href={project.github} icon={Code}>
                  GitHub
                </Button>
              )}
              {project.demo && (
                <Button href={project.demo} variant="secondary" icon={Play}>
                  Watch demo
                </Button>
              )}
            </div>
          )}
        </Reveal>

        <Reveal className="mt-10">
          <div className="flex h-80 justify-center gap-4 overflow-hidden rounded-card border border-border bg-accent-soft sm:h-96">
            {screens.slice(0, 3).map((screen, i) => (
              <PhoneMockup
                key={screen.label}
                screen={screen}
                priority={i === 0}
                className={cn(
                  "w-36 shrink-0 sm:w-44",
                  i !== 1 && "mt-12",
                  i === 1 && "mt-6",
                  i === 2 && "hidden sm:block",
                )}
              />
            ))}
          </div>
        </Reveal>

        <Block title="Overview">
          <p className="text-muted-foreground">{study.overview}</p>
        </Block>

        <Block title="Features">
          <div className="grid gap-4 sm:grid-cols-2">
            {study.features.map((feature) => (
              <Card key={feature.title} className="p-5">
                <span className="flex size-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {feature.text}
                </p>
              </Card>
            ))}
          </div>
        </Block>
      </Container>

      <section className="mt-16" aria-label={`${project.name} screens`}>
        <Container>
          <Reveal>
            <h2 className="text-2xl sm:text-3xl">Screens</h2>
            <p className="mt-2 text-sm block xl:hidden text-muted-foreground">
              Scroll sideways to browse.
            </p>
          </Reveal>
        </Container>
        <div className="mt-6 flex snap-x gap-4 overflow-x-auto xl:overflow-x-hidden px-[max(1.25rem,calc((100%_-_48rem)/2_+_1.5rem))] pb-6">
          {screens.map((screen) => (
            <div
              key={screen.label}
              className="w-44 shrink-0 snap-center sm:w-48"
            >
              <PhoneMockup screen={screen} />
            </div>
          ))}
        </div>
      </section>

      <Container>
        <Block title="Architecture and decisions">
          <Card className="divide-y divide-border p-0">
            {study.decisions.map((decision) => (
              <div key={decision.title} className="p-5">
                <h3 className="text-base">{decision.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {decision.text}
                </p>
              </div>
            ))}
          </Card>
        </Block>

        <Block title="Challenges and solutions">
          <div className="space-y-4">
            {study.challenges.map((challenge) => (
              <Card key={challenge.problem} className="p-5">
                <dl className="space-y-4">
                  {(
                    [
                      ["Problem", challenge.problem],
                      ["Approach", challenge.approach],
                      ["Result", challenge.result],
                    ] as const
                  ).map(([label, text]) => (
                    <div
                      key={label}
                      className="grid gap-1 sm:grid-cols-[96px_1fr] sm:gap-4"
                    >
                      <dt className="font-mono text-xs text-accent">{label}</dt>
                      <dd className="text-sm text-muted-foreground">{text}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            ))}
          </div>
        </Block>

        <Block title="Results and next steps">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <h3 className="text-base">Results</h3>
              <ul className="mt-3 space-y-2">
                {study.results.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm text-muted-foreground"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-5">
              <h3 className="text-base">What I would build next</h3>
              <ul className="mt-3 space-y-2">
                {study.next.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm text-muted-foreground"
                  >
                    <ArrowRight
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Block>

        <Reveal className="mt-16 space-y-4">
          <Link
            href={`/work/${next.slug}`}
            className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Card interactive className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  Next project
                </p>
                <p className="mt-1 font-display text-xl font-bold">
                  {next.name}
                </p>
                <p className="text-sm text-muted-foreground">{next.tagline}</p>
              </div>
              <ArrowRight
                className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Card>
          </Link>
          <Button href="/#work" variant="secondary" icon={ArrowLeft}>
            Back to all work
          </Button>
        </Reveal>
      </Container>
    </article>
  );
}