import { useParams } from "react-router-dom";
import { projectsData } from "../data/projects";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-bold">Project Not Found</h2>
        <p>The ID "{projectId}" does not match any projects.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-16">
      {/* Header Section */}
      <section>
        <h1 className="text-4xl font-extrabold mb-4">{project.title}</h1>
        <div className="flex gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-secondary rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Dynamic Content Sections */}
      <div className="space-y-20">
        {project.sections.map((section, index) => (
          <div key={index} className="w-full">
            {section.type === "side-by-side" ? (
              <div className={`flex flex-col md:flex-row gap-10 items-center ${section.reverse ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 text-lg leading-relaxed text-muted-foreground">
                  {section.text}
                </div>
                <div className="flex-1 rounded-xl overflow-hidden border bg-muted shadow-md">
                  <img 
                    src={section.imagePath} 
                    alt={`Detail for ${project.title}`} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">{section.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;