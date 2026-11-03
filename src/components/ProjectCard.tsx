interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
}

export const ProjectCard = ({ title, description, tags, imageUrl }: ProjectProps) => {
  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-sm transition-shadow hover:shadow-md">

      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt=""  // decorative: the card's heading already names the project
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
