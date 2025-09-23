"use client";

import { useTheme } from "@/providers/theme-provider";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({
  className,
}: ThemeToggleProps): JSX.Element {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className={cn(
        "hover:bg-gray dark:hover:bg-background hover:cursor-pointer",
        className
      )}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="icon"
      variant="ghost"
    >
      <Sun className="size-5 dark:hidden" />
      <Moon className="hidden size-5 dark:block" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
