import { useParams } from "react-router-dom";
import { projectsData } from "../data/projects";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) return <div className="p-12 text-center font-bold">Project Not Found</div>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-16">
      {/* Header */}
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

      {/* Dynamic Sections */}
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

          // Default to Text type
          return (
            <div key={index} className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {section.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectDetails;