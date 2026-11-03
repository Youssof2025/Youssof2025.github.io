import katex from "katex";
import "katex/dist/katex.min.css"; // loaded with the first equation, not on every page
import { useMemo } from "react";

interface EquationProps {
  math: string;
  display?: boolean; // true = block/centered equation, false = inline
  className?: string;
}

export const Equation = ({ math, display = true, className }: EquationProps) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
      });
    } catch {
      return math;
    }
  }, [math, display]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
