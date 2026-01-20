import { ExternalLink, Github } from "lucide-react";

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const ProjectCard = ({ title, description, tags, githubUrl, liveUrl }: ProjectProps) => {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm transition-hover hover:shadow-md">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        {githubUrl && (
          <a href={githubUrl} className="flex items-center gap-1 text-sm hover:underline" target="_blank">
            <Github size={16} /> Code
          </a>
        )}
        {liveUrl && (
          <a href={liveUrl} className="flex items-center gap-1 text-sm hover:underline" target="_blank">
            <ExternalLink size={16} /> Demo
          </a>
        )}
      </div>
    </div>
  );
};