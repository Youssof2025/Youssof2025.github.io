import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/photography", label: "Photography" },
  { to: "/about", label: "About" },
];

const Nav = () => {
  return (
    <div className="flex w-full items-center justify-between px-4 py-4 md:px-6">
      <nav aria-label="Main" className="max-w-full overflow-x-auto">
        <ul className="flex flex-nowrap items-center gap-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              {/* NavLink sets aria-current="page"; `end` keeps Home from matching every route */}
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  cn(
                    "inline-flex h-9 items-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap outline-none transition-[color,box-shadow] hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
                    isActive && "bg-accent text-accent-foreground"
                  )
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="ml-2 flex items-center shrink-0">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Nav;
