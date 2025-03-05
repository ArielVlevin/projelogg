"use client";

import { Check, Moon, Palette, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { colorThemes, ColorThemeKey, useTheme } from "@/contexts/ThemeContext";

export function ThemeSwitcher() {
  const { theme, colorTheme, toggleTheme, setColorTheme } = useTheme();

  return (
    <div className="flex gap-2">
      {/* Color theme selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Change color theme"
          >
            <Palette className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Color Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.entries(colorThemes).map(([key, value]) => (
            <DropdownMenuItem
              key={value.name}
              onClick={() => setColorTheme(key as ColorThemeKey)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full bg-gradient-to-r ${value.titleGradient}`}
                ></div>
                <span>{value.name}</span>
              </div>
              {colorTheme === key && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Light/Dark mode toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
