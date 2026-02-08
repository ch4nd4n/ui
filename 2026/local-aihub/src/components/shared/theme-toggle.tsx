import { useEffect } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import type { Theme } from "@/lib/constants";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const nextTheme: Theme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(nextTheme);
  };

  // Handle keyboard shortcut: Ctrl+Shift+T (Cmd+Shift+T on Mac)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
      const isModifierPressed = isMac ? e.metaKey : e.ctrlKey;

      if (isModifierPressed && e.shiftKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        cycleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [theme]);

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      case "system":
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Light mode";
      case "dark":
        return "Dark mode";
      case "system":
      default:
        return "System mode";
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      aria-label={`Toggle theme (current: ${getLabel()})`}
      title={`Toggle theme (current: ${getLabel()}). Keyboard shortcut: Ctrl+Shift+T`}
    >
      {getIcon()}
    </Button>
  );
}
