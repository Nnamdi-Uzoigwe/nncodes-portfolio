import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import type { Project } from "@/data/projects";
import type { CaseStudy } from "@/data/case-studies";

type Props = {
  project: Project;
  study: CaseStudy;
  nextProject: Project;
};

function DetailSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-6 border-t border-black/10 py-10 md:grid-cols-[220px_1fr] md:gap-12 sm:py-14">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
          {number}
        </p>
        <h2 className="font-heading mt-3 text-xl font-normal tracking-tight sm:text-2xl">
          {title}
        </h2>
      </div>

      <div>{children}</div>
    </section>
  );
}

export default function ProjectDetail({
  project,
  study,
  nextProject,
}: Props) {
  return (
    <main
      id="home"
      className="min-h-screen bg-page px-5 text-neutral-950 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-300 pt-8 pb-28 sm:pt-12">
        <Link
          href="/#mobile"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 transition hover:text-plum"
        >
          <ArrowLeft size={16} />
          All mobile builds
        </Link>

        <header className="mt-12 sm:mt-20">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold tracking-[0.14em] uppercase">
            <span className="text-plum">Project walkthrough</span>
            <span className="rounded-full bg-neutral-100 px-3 py-1.5 text-neutral-600">
              {project.status}
            </span>
          </div>

          <h1 className="font-heading mt-6 wrap-break-word text-[clamp(2.8rem,9vw,8rem)] font-normal leading-[1.05] tracking-[-0.055em]">
            {project.name}
          </h1>

          <p className="mt-4 text-xl font-semibold text-neutral-600 sm:text-2xl">
            {project.tagline}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            {project.description}
          </p>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-plum px-5 py-3 text-sm font-semibold text-white transition hover:opacity-85"
          >
            {/* <Github size={17} /> */}
            Github
            <ArrowUpRight size={16} />
          </a>
        </header>

        {/* Your screenshot already contains the iPhone frame. */}
        <div className="mt-12 rounded-[28px] bg-[#ebdcee] px-5 py-10 dark:bg-[#211925] sm:mt-16 sm:py-14">
          <div className="relative mx-auto h-105 max-w-150 sm:h-150">
            <Image
              src={project.screen}
              alt={`${project.name} application preview`}
              fill
              unoptimized
              className="object-contain drop-shadow-xl"
            />
          </div>
        </div>

        <dl className="my-10 grid gap-7 sm:my-14 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-semibold text-plum">
              Platform
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-neutral-600">
              {study.platform}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold text-plum">
              Built for
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-neutral-600">
              {study.audience}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold text-plum">
              Stack
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-neutral-600">
              {project.tags.join(" · ")}
            </dd>
          </div>
        </dl>

        <DetailSection number="01" title="The overview">
          <p className="max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            {study.overview}
          </p>
        </DetailSection>

        <DetailSection number="02" title="What it does">
          <div className="grid gap-8 sm:grid-cols-2">
            {study.features.map((feature) => (
              <div key={feature.title}>
                <h3 className="font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </DetailSection>

        <DetailSection number="03" title="The decisions">
          <div className="space-y-8">
            {study.decisions.map((decision) => (
              <div key={decision.title}>
                <h3 className="font-bold">{decision.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {decision.text}
                </p>
              </div>
            ))}
          </div>
        </DetailSection>

        <DetailSection number="04" title="Working through it">
          <div className="space-y-6">
            {study.challenges.map((challenge, index) => (
              <div
                key={challenge.problem}
                className="rounded-[20px] border border-black/10 p-5 sm:p-7"
              >
                <p className="text-[10px] font-semibold tracking-widest text-plum uppercase">
                  Challenge {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-3 font-bold leading-relaxed">
                  {challenge.problem}
                </h3>

                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="font-semibold">Approach</dt>
                    <dd className="mt-1 leading-relaxed text-neutral-600">
                      {challenge.approach}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Result</dt>
                    <dd className="mt-1 leading-relaxed text-neutral-600">
                      {challenge.result}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </DetailSection>

        <DetailSection number="05" title="Where it stands">
          <ul className="space-y-4">
            {study.results.map((result) => (
              <li key={result} className="flex gap-3 text-sm leading-relaxed text-neutral-600">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-plum" />
                {result}
              </li>
            ))}
          </ul>
        </DetailSection>

        <DetailSection number="06" title="What comes next">
          <ul className="space-y-3">
            {study.next.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-neutral-600">
                <span aria-hidden="true">↗</span>
                {item}
              </li>
            ))}
          </ul>
        </DetailSection>

        <Link
          href={`/projects/${nextProject.slug}`}
          className="group mt-8 flex items-center justify-between gap-5 rounded-3xl bg-plum p-7 text-white sm:p-10"
        >
          <div>
            <p className="text-[10px] font-semibold tracking-[0.16em] text-white/60 uppercase">
              Next project
            </p>
            <p className="font-heading mt-3 text-2xl font-normal tracking-tight sm:text-4xl">
              {nextProject.name}
            </p>
          </div>

          <ArrowUpRight
            size={32}
            className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </main>
  );
}