"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "soft"
    | "subtle"
    | "outlined"
    | "gradient";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const { currentTheme } = useTheme();

    // Apply the appropriate styling based on the variant
    const getButtonStyles = () => {
      switch (variant) {
        case "gradient":
          return `bg-gradient-to-r ${currentTheme.buttonGradient}`;
        case "soft":
          return currentTheme.buttonSoft;
        case "outlined":
          return currentTheme.buttonOutlined;
        case "subtle":
          return currentTheme.buttonSubtle;
        default:
          return "";
      }
    };

    // Map custom variants to shadcn variants
    const getShadcnVariant = () => {
      switch (variant) {
        case "gradient":
        case "soft":
        case "subtle":
          return "default";
        case "outlined":
          return "outline";
        default:
          return variant;
      }
    };

    return (
      <ShadcnButton
        ref={ref}
        variant={getShadcnVariant() as "default" | "outline" | "ghost" | "link"}
        className={cn(getButtonStyles(), className)}
        {...props}
      >
        {children}
      </ShadcnButton>
    );
  }
);
Button.displayName = "Button";
