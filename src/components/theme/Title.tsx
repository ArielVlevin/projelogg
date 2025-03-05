"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  gradient?: boolean;
}

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  (
    {
      className,
      as: Component = "h1",
      size = "2xl",
      gradient = true,
      children,
      ...props
    },
    ref
  ) => {
    const { currentTheme } = useTheme();

    const getGradient = () => {
      switch (Component) {
        case "h1":
          return currentTheme.h1Gradient;
        case "h2":
          return currentTheme.h2Gradient;
        case "h3":
          return currentTheme.h3Gradient;
        case "h4":
          return currentTheme.h4Gradient;
        case "h5":
          return currentTheme.h5Gradient;
        case "h6":
          return currentTheme.h6Gradient;
        default:
          return currentTheme.titleGradient;
      }
    };
    return (
      <Component
        ref={ref}
        className={cn(
          `font-bold tracking-tight`,
          {
            "text-sm": size === "sm",
            "text-md": size === "md",
            "text-lg": size === "lg",
            "text-xl": size === "xl",
            "text-2xl": size === "2xl",
            "text-3xl": size === "3xl",
            "text-4xl": size === "4xl",
          },
          gradient &&
            `bg-gradient-to-r ${getGradient()} bg-clip-text text-transparent`,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Title.displayName = "Title";
