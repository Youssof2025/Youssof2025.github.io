import { useState } from "react";
import { useParams } from "react-router-dom";
import { projectsData } from "../data/projects";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

  const ProjectDetails = () => {
  const { projectId } = useParams();
  const project = projectsData.find((p) => p.id === projectId);

  const [index, setIndex] = useState(-1);

  if (!project) return <div className="p-12 text-center font-bold">Project Not Found</div>;

  const slides = project.gallery?.map((src) => ({ src })) || [];

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-16">
      <section>
        <h1 className="text-4xl font-extrabold mb-4">{project.title}</h1>
        <div className="flex gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-secondary rounded-full text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <div className="space-y-20">
        {project.sections.map((section, index) => {
          if (section.type === "full-image") {
            return (
              <div key={index} className="space-y-4">
                <div className="rounded-2xl overflow-hidden border bg-muted shadow-lg">
                  <img 
                    src={section.imagePath} 
                    alt={section.text || "Full width detail"} 
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
                  <img src={section.imagePath} alt="Technical detail" className="w-full h-auto" />
                </div>
              </div>
            );
          }

          return (
            <div key={index} className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {section.text}
              </p>
            </div>
          );
        })}
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <section className="pt-16 border-t">
          <h2 className="text-3xl font-bold mb-8">Project Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((img, i) => (
              <div 
                key={i} 
                className="aspect-square rounded-xl overflow-hidden border bg-card shadow-sm cursor-pointer group"
                onClick={() => setIndex(i)}
              >
                <img 
                  src={img} 
                  alt={`Gallery image ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
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