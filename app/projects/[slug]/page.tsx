import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import ProjectDetail from "@/components/ProjectDetail";
import { seo } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

const availableProjects = projects.filter(
  (project) => Boolean(caseStudies[project.slug])
);

export function generateStaticParams() {
  return availableProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const project = availableProjects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    return {
      title: "Project not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${project.name} — ${project.tagline}`;
  const path = `/projects/${project.slug}`;

  return {
    title,
    description: project.description,

    alternates: {
      canonical: path,
    },

    openGraph: {
      type: "website",
      siteName: seo.name,
      title: `${project.name} — Nnamdi Uzoigwe`,
      description: project.description,
      url: path,
    },

    twitter: {
      card: "summary_large_image",
      title: `${project.name} — Nnamdi Uzoigwe`,
      description: project.description,
    },
  };
}

function ProjectSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading project"
      className="
        min-h-screen bg-page px-5
        pt-8 pb-28 dark:bg-neutral-950
        sm:px-8 sm:pt-12 lg:px-12
      "
    >
      <div
        aria-hidden="true"
        className="
          mx-auto max-w-300
          animate-pulse motion-reduce:animate-none
        "
      >
        <div className="h-4 w-32 rounded bg-neutral-100 dark:bg-neutral-800" />

        <div className="mt-14 sm:mt-20">
          <div className="h-5 w-44 rounded-full bg-neutral-100 dark:bg-neutral-800" />

          <div className="mt-6 h-20 w-3/4 rounded-xl bg-neutral-100 dark:bg-neutral-800 sm:h-28" />

          <div className="mt-5 h-6 w-1/2 rounded bg-neutral-100 dark:bg-neutral-800" />

          <div className="mt-8 max-w-2xl space-y-3">
            <div className="h-4 rounded bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-4 w-4/5 rounded bg-neutral-100 dark:bg-neutral-800" />
          </div>

          <div className="mt-8 h-11 w-44 rounded-full bg-neutral-100 dark:bg-neutral-800" />
        </div>

        <div className="mt-12 h-125 rounded-[28px] bg-plum-soft dark:bg-neutral-900 sm:mt-16" />
      </div>

      <span className="sr-only">Loading project details…</span>
    </div>
  );
}

// The URL-dependent read happens inside the Suspense boundary.
async function ProjectContent({ params }: Props) {
  const { slug } = await params;

  const index = availableProjects.findIndex(
    (project) => project.slug === slug
  );

  if (index === -1) {
    notFound();
  }

  const project = availableProjects[index];
  const study = caseStudies[slug];

  const nextProject =
    availableProjects[(index + 1) % availableProjects.length];

  return (
    <ProjectDetail
      project={project}
      study={study}
      nextProject={nextProject}
    />
  );
}

// Keep this wrapper synchronous; pass params through without awaiting it.
export default function ProjectPage({ params }: Props) {
  return (
    <Suspense fallback={<ProjectSkeleton />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}