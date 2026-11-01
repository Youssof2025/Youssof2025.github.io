import { Github, Linkedin, Mail } from "lucide-react";

const links = [
  { href: "mailto:youssof@youssoftech.dev", label: "Email", icon: Mail },
  { href: "https://www.linkedin.com/in/youssofsoliman", label: "LinkedIn", icon: Linkedin },
  { href: "https://github.com/Youssof2025", label: "GitHub", icon: Github },
];

const Footer = () => {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Youssof Soliman</p>
        <div className="flex items-center gap-5">
          {links.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="hover:text-foreground transition-colors"
              {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
            >
              <Icon className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
