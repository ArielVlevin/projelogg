"use client";

import type React from "react";

import { useTheme } from "@/contexts/ThemeContext";

interface BackgroundProps {
  children: React.ReactNode;
}

export function Background({ children }: BackgroundProps) {
  const { theme, currentTheme } = useTheme();

  return (
    <div className={`min-h-screen ${theme}`}>
      {/* Background with gradient and pattern */}
      <div
        className={`fixed inset-0 -z-10 bg-gradient-to-b ${currentTheme.gradient} dark:from-gray-950 dark:to-gray-900`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50 dark:opacity-20"></div>
      </div>

      {/* Decorative shapes */}
      <div
        className={`fixed top-0 right-0 -z-10 h-[300px] w-[300px] rounded-full ${currentTheme.accent1} opacity-20 blur-3xl`}
      ></div>
      <div
        className={`fixed bottom-0 left-0 -z-10 h-[250px] w-[250px] rounded-full ${currentTheme.accent2} opacity-20 blur-3xl`}
      ></div>

      {children}
    </div>
  );
}
