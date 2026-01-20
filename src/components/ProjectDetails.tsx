import { useParams } from "react-router-dom";
import { projectsData } from "../data/projects"; //

const ProjectDetails = () => {
  const { projectId } = useParams();
  
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-bold">Project Not Found</h2>
        <p>The ID "{projectId}" does not match any projects in your data file.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-4">{project.title}</h1>
      <div className="flex gap-2 mb-8">
        {project.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-secondary rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
      <div className="prose dark:prose-invert">
        <p className="text-lg leading-relaxed">{project.content}</p>
      </div>
    </div>
  );
};

export default ProjectDetails;