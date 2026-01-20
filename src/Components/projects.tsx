import { ProjectCard } from "./ProjectCard";

const Projects = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Engineering Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectCard 
          title="Thermocouple Reading Device (TRD-1)"
          description="A PCB Designed to measure the internal temperature of a custom made carbonfiber oven."
          tags={["Altium", "PCB-Design", "Board-Assembly"]}
          githubUrl="https://github.com/your-username/cs50"
        />
      </div>
    </div>
  );
};

export default Projects;