"use client";

import type React from "react";

import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

// Themed Accordion
export const ThemedAccordion = forwardRef<
  ElementRef<typeof Accordion>,
  ComponentPropsWithoutRef<typeof Accordion>
>(({ className, ...props }, ref) => {
  return <Accordion ref={ref} className={cn("w-full", className)} {...props} />;
});
ThemedAccordion.displayName = "ThemedAccordion";

// Themed AccordionItem
interface ThemedAccordionItemProps
  extends ComponentPropsWithoutRef<typeof AccordionItem> {
  bordered?: boolean;
}

export const ThemedAccordionItem = forwardRef<
  ElementRef<typeof AccordionItem>,
  ThemedAccordionItemProps
>(({ className, bordered = true, ...props }, ref) => {
  const { currentTheme } = useTheme();

  return (
    <AccordionItem
      ref={ref}
      className={cn(
        bordered && `border-b ${currentTheme.accordionBorder}`,
        className
      )}
      {...props}
    />
  );
});
ThemedAccordionItem.displayName = "ThemedAccordionItem";

interface ThemedAccordionTriggerProps
  extends ComponentPropsWithoutRef<typeof AccordionTrigger> {
  variant?: "default" | "filled" | "subtle" | "outline";
  icon?: React.ReactNode;
  hideIcon?: boolean;
  layout?: "default" | "spaceBetween";
}

export const ThemedAccordionTrigger = forwardRef<
  ElementRef<typeof AccordionTrigger>,
  ThemedAccordionTriggerProps
>(
  (
    {
      className,
      children,
      variant = "default",
      icon,
      hideIcon = false,
      layout = "spaceBetween",
      ...props
    },
    ref
  ) => {
    const { currentTheme } = useTheme();

    const getVariantClasses = () => {
      switch (variant) {
        case "filled":
          return `${currentTheme.accordionBackground} p-3 rounded-lg ${currentTheme.accordionTrigger}`;
        case "subtle":
          return `hover:${currentTheme.accordionBackground} p-3 rounded-lg ${currentTheme.accordionTrigger}`;
        case "outline":
          return `border ${currentTheme.accordionBorder} p-3 rounded-lg ${currentTheme.accordionTrigger}`;
        default:
          return currentTheme.accordionTrigger;
      }
    };
    const getLayoutClasses = () => {
      switch (layout) {
        case "spaceBetween":
          return "flex justify-between items-center";
        default:
          return "flex items-center justify-between";
      }
    };

    return (
      <AccordionTrigger
        ref={ref}
        className={cn(
          "py-3 transition-all hover:no-underline",
          getLayoutClasses(),
          getVariantClasses(),
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2 ">{icon && icon}</div>
        {children}
        {!hideIcon && (
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-200",
              currentTheme.accordionIcon
            )}
          />
        )}
      </AccordionTrigger>
    );
  }
);
ThemedAccordionTrigger.displayName = "ThemedAccordionTrigger";

// Themed AccordionContent
export const ThemedAccordionContent = forwardRef<
  ElementRef<typeof AccordionContent>,
  ComponentPropsWithoutRef<typeof AccordionContent>
>(({ className, ...props }, ref) => {
  return (
    <AccordionContent
      ref={ref}
      className={cn("pt-2 pb-4", className)}
      {...props}
    />
  );
});
ThemedAccordionContent.displayName = "ThemedAccordionContent";
