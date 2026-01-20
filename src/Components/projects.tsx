import { projectsData } from "../data/projects"; // Adjust path if needed
import { ProjectCard } from "./ProjectCard";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Engineering Projects</h1>
      
      {/* This grid will now automatically grow as you add projects to your data file */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`} className="block transition-transform hover:scale-[1.02]">
            <ProjectCard 
              title={project.title}
              description={project.description}
              tags={project.tags}
              imageUrl={project.imageUrl || "/api/placeholder/400/320"} // Fallback image
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;