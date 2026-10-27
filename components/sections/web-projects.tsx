import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { webProjects } from "@/data/projects";

export function WebProjects() {
  return (
    <section id="web" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Web projects"
          title="Production web work"
          description="Mobile is my focus, and I also ship web products for real clients."
        />

        <div className="mt-10 space-y-4">
          {webProjects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.04}>
              <Card
                interactive
                className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg">{project.name}</h3>
                    {project.live && (
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <span
                          className="size-1.5 rounded-full bg-emerald-500"
                          aria-hidden="true"
                        />
                        Currently in use
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {project.label}
                  </p>
                  <p className="mt-3 max-w-md text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>

                {project.url && (
                  <Button
                    href={project.url}
                    variant="secondary"
                    size="sm"
                    icon={ExternalLink}
                    iconPosition="right"
                    className="shrink-0"
                  >
                    Visit site
                  </Button>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}