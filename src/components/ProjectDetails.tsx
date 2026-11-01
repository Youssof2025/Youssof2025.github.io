import { useState } from "react";
import { useParams } from "react-router-dom";
import { projectsData } from "../data/projects";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Equation } from "@/components/Equation";
import NotFound from "@/components/NotFound";
import { usePageTitle } from "@/hooks/usePageTitle";
import { altFromPath } from "@/lib/utils";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const project = projectsData.find((p) => p.id === projectId);

  const [index, setIndex] = useState(-1);
  usePageTitle(project?.title ?? "Not Found");

  if (!project) return <NotFound message="That project doesn't exist (yet)." />;

  const slides = project.gallery?.map((src) => ({ src, alt: altFromPath(src) })) || [];

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-16">
      <section>
        <h1 className="text-4xl font-extrabold mb-4">{project.title}</h1>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-secondary rounded-full text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <div className="space-y-10">
        {project.sections.map((section, index) => {
          if (section.type === "full-image") {
            return (
              <div key={index} className="space-y-4">
                <div className="rounded-2xl overflow-hidden border bg-muted shadow-lg">
                  <img
                    src={section.imagePath}
                    alt={section.alt ?? section.text ?? altFromPath(section.imagePath ?? "")}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover"
                  />
                </div>
                {section.text && (
                  <p className="text-sm text-center text-muted-foreground italic">
                    {section.text}
                  </p>
                )}
              </div>
            );
          }

          if (section.type === "equation") {
            return (
              <div key={index} className="flex flex-col items-center gap-2 -mt-6 first:mt-0">
                <div className="overflow-x-auto rounded-lg border bg-card px-6 py-3">
                  <Equation math={section.math!} />
                </div>
                {section.caption && (
                  <p className="text-sm text-center text-muted-foreground italic">
                    {section.caption}
                  </p>
                )}
              </div>
            );
          }

          if (section.type === "side-by-side") {
            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row gap-10 items-center ${section.reverse ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 text-lg leading-relaxed text-muted-foreground">
                  {section.text}
                </div>
                <div className="flex-1 rounded-xl overflow-hidden border bg-muted shadow-md">
                  <img
                    src={section.imagePath}
                    alt={section.alt ?? altFromPath(section.imagePath ?? "")}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            );
          }

          return (
            <p key={index} className="text-lg leading-relaxed text-muted-foreground">
              {section.text}
            </p>
          );
        })}
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <section className="pt-16 border-t">
          <h2 className="text-3xl font-bold mb-8">Project Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((img, i) => (
              <button
                type="button"
                key={i}
                className="aspect-square rounded-xl overflow-hidden border bg-card shadow-sm cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setIndex(i)}
                aria-label={`Open ${altFromPath(img)}`}
              >
                <img
                  src={img}
                  alt={altFromPath(img)}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </section>
      )}

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </div>
  );
};

export default ProjectDetails;
