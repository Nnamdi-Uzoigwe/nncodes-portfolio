import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CaseStudyView } from "@/components/case-study/case-study-view";
import { Container } from "@/components/ui/container";
import { caseStudies } from "@/data/case-studies";
import { projects } from "@/data/projects";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.name} case study`,
    description: project.description,
  };
}

async function CaseStudyContent({ params }: PageProps) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const study = caseStudies[slug];

  if (index === -1 || !study) notFound();

  return (
    <CaseStudyView
      project={projects[index]}
      study={study}
      next={projects[(index + 1) % projects.length]}
    />
  );
}

function CaseStudyFallback() {
  return (
    <div className="pt-28 pb-8 sm:pt-32">
      <Container>
        <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
        <div className="mt-6 h-12 w-2/3 animate-pulse rounded-lg bg-muted" />
        <div className="mt-4 h-5 w-1/3 animate-pulse rounded-md bg-muted" />
        <div className="mt-10 h-80 animate-pulse rounded-card bg-muted" />
      </Container>
    </div>
  );
}

export default function CaseStudyPage({ params }: PageProps) {
  return (
    <Suspense fallback={<CaseStudyFallback />}>
      <CaseStudyContent params={params} />
    </Suspense>
  );
}