import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = projects
    .filter((project) => Boolean(caseStudies[project.slug]))
    .map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
    }));

  return [
    {
      url: siteUrl,
    },
    ...projectPages,
  ];
}