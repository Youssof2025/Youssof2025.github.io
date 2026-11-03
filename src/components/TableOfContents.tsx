export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

// Smooth-scrolls to a heading and puts its id in the URL so the link can be shared
const jumpTo = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
};

export const TableOfContents = ({ entries }: { entries: TocEntry[] }) => {
  return (
    <nav aria-label="On this page" className="rounded-xl border bg-card p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
        On this page
      </h2>
      <ol className="space-y-2">
        {entries.map((entry) => (
          <li key={entry.id} className={entry.level === 3 ? "pl-4 text-sm" : "font-medium"}>
            <a
              href={`#${entry.id}`}
              onClick={jumpTo(entry.id)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
