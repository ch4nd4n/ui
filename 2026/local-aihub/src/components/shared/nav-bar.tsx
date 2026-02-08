import { Link, useLocation } from "react-router-dom";
import { Bot } from "lucide-react";
import { cn } from "@/lib/cn";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/ocr", label: "OCR" },
];

export function NavBar() {
  const location = useLocation();

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Bot className="h-5 w-5" />
          Local-AiHub
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                location.pathname === link.path
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
