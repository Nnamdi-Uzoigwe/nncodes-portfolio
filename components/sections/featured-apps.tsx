import { ArrowUpRight, Code, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PhoneMockup } from "@/components/ui/phone-mockup";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { projects } from "@/data/projects";

export function FeaturedApps() {
  return (
    <section id="work" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="Mobile apps I have built"
          description="Five apps across productivity, commerce, finance, delivery and utility. Each one has its own case study."
        />

        <div className="mt-10 space-y-5">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.04}>
              <Card
                interactive
                className="grid overflow-hidden p-0 sm:grid-cols-[200px_1fr]"
              >
                <div className="relative h-52 overflow-hidden bg-muted sm:h-auto sm:min-h-60">
                  <PhoneMockup
                    screen={project.screen}
                    className="absolute top-6 left-1/2 w-32 -translate-x-1/2"
                  />
                </div>

                <div className="flex flex-col p-6">
                  <p className="font-mono text-xs text-accent">
                    {project.status}
                  </p>
                  <h3 className="mt-2 text-xl">{project.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    <Button
                      href={`/work/${project.slug}`}
                      size="sm"
                      icon={ArrowUpRight}
                      iconPosition="right"
                    >
                      Case study
                    </Button>
                    {project.github && (
                      <Button
                        href={project.github}
                        variant="secondary"
                        size="sm"
                        icon={Code}
                      >
                        GitHub
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        href={project.demo}
                        variant="secondary"
                        size="sm"
                        icon={Play}
                      >
                        Demo
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}