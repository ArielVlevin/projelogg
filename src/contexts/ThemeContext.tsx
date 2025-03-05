"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
export const colorThemes = {
  blue: {
    name: "Blue & Purple",
    gradient: "from-white to-blue-50",
    accent1: "bg-blue-200 dark:bg-blue-700",
    accent2: "bg-purple-200 dark:bg-purple-700",
    titleGradient:
      "from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400",
    h1Gradient:
      "from-blue-700 to-purple-700 dark:from-blue-500 dark:to-purple-500",
    h2Gradient:
      "from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400",
    h3Gradient:
      "from-blue-500 to-purple-500 dark:from-blue-300 dark:to-purple-300",
    h4Gradient:
      "from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400",
    h5Gradient:
      "from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400",
    h6Gradient: "from-blue-500 to-blue-700 dark:from-blue-300 dark:to-blue-500",
    buttonGradient:
      "from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500",
    buttonSoft:
      "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50",
    buttonOutlined:
      "border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/20",
    buttonSubtle:
      "bg-blue-100/50 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30",
    featureBadge:
      "bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
    bugBadge:
      "bg-amber-50 text-amber-700 hover:bg-amber-50 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
    // Add accordion styles
    accordionTrigger:
      "text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200",
    accordionBackground: "bg-blue-50/50 dark:bg-blue-900/20",
    accordionBorder: "border-blue-200 dark:border-blue-800",
    accordionIcon: "text-blue-500 dark:text-blue-400",
  },
  green: {
    name: "Green & Teal",
    gradient: "from-white to-green-50",
    accent1: "bg-green-200 dark:bg-green-700",
    accent2: "bg-teal-200 dark:bg-teal-700",
    titleGradient:
      "from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400",
    h1Gradient:
      "from-green-700 to-teal-700 dark:from-green-500 dark:to-teal-500",
    h2Gradient:
      "from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400",
    h3Gradient:
      "from-green-500 to-teal-500 dark:from-green-300 dark:to-teal-300",
    h4Gradient:
      "from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400",
    h5Gradient:
      "from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400",
    h6Gradient:
      "from-green-500 to-green-700 dark:from-green-300 dark:to-green-500",
    buttonGradient:
      "from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 dark:from-green-500 dark:to-teal-500",
    buttonSoft:
      "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50",
    buttonOutlined:
      "border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/20",
    buttonSubtle:
      "bg-green-100/50 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/30",
    featureBadge:
      "bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
    bugBadge:
      "bg-amber-50 text-amber-700 hover:bg-amber-50 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
    accordionTrigger:
      "text-green-700 hover:text-green-800 dark:text-green-300 dark:hover:text-green-200",
    accordionBackground: "bg-green-50/50 dark:bg-green-900/20",
    accordionBorder: "border-green-200 dark:border-green-800",
    accordionIcon: "text-green-500 dark:text-green-400",
  },
  orange: {
    name: "Orange & Red",
    gradient: "from-white to-orange-50",
    accent1: "bg-orange-200 dark:bg-orange-700",
    accent2: "bg-red-200 dark:bg-red-700",
    titleGradient:
      "from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400",
    h1Gradient:
      "from-orange-600 to-red-600 dark:from-orange-500 dark:to-red-500",
    h2Gradient:
      "from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400",
    h3Gradient:
      "from-orange-400 to-red-400 dark:from-orange-300 dark:to-red-300",
    h4Gradient:
      "from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400",
    h5Gradient: "from-amber-500 to-red-500 dark:from-amber-400 dark:to-red-400",
    h6Gradient:
      "from-orange-400 to-orange-600 dark:from-orange-300 dark:to-orange-500",
    buttonGradient:
      "from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 dark:from-orange-500 dark:to-red-500",
    buttonSoft:
      "bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300 dark:hover:bg-orange-900/50",
    buttonOutlined:
      "border-orange-300 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-900/20",
    buttonSubtle:
      "bg-orange-100/50 text-orange-800 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-300 dark:hover:bg-orange-900/30",
    featureBadge:
      "bg-orange-50 text-orange-700 hover:bg-orange-50 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
    bugBadge:
      "bg-red-50 text-red-700 hover:bg-red-50 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
    accordionTrigger:
      "text-orange-700 hover:text-orange-800 dark:text-orange-300 dark:hover:text-orange-200",
    accordionBackground: "bg-orange-50/50 dark:bg-orange-900/20",
    accordionBorder: "border-orange-200 dark:border-orange-800",
    accordionIcon: "text-orange-500 dark:text-orange-400",
  },
  pink: {
    name: "Pink & Purple",
    gradient: "from-white to-pink-50",
    accent1: "bg-pink-200 dark:bg-pink-700",
    accent2: "bg-purple-200 dark:bg-purple-700",
    titleGradient:
      "from-pink-500 to-purple-500 dark:from-pink-400 dark:to-purple-400",
    h1Gradient:
      "from-pink-600 to-purple-600 dark:from-pink-500 dark:to-purple-500",
    h2Gradient:
      "from-pink-500 to-purple-500 dark:from-pink-400 dark:to-purple-400",
    h3Gradient:
      "from-pink-400 to-purple-400 dark:from-pink-300 dark:to-purple-300",
    h4Gradient:
      "from-pink-500 to-fuchsia-500 dark:from-pink-400 dark:to-fuchsia-400",
    h5Gradient:
      "from-fuchsia-500 to-purple-500 dark:from-fuchsia-400 dark:to-purple-400",
    h6Gradient: "from-pink-400 to-pink-600 dark:from-pink-300 dark:to-pink-500",
    buttonGradient:
      "from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 dark:from-pink-500 dark:to-purple-500",
    buttonSoft:
      "bg-pink-50 text-pink-700 hover:bg-pink-100 dark:bg-pink-900/30 dark:text-pink-300 dark:hover:bg-pink-900/50",
    buttonOutlined:
      "border-pink-300 text-pink-700 hover:bg-pink-50 dark:border-pink-700 dark:text-pink-300 dark:hover:bg-pink-900/20",
    buttonSubtle:
      "bg-pink-100/50 text-pink-800 hover:bg-pink-100 dark:bg-pink-900/20 dark:text-pink-300 dark:hover:bg-pink-900/30",
    featureBadge:
      "bg-pink-50 text-pink-700 hover:bg-pink-50 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800",
    bugBadge:
      "bg-purple-50 text-purple-700 hover:bg-purple-50 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
    accordionTrigger:
      "text-pink-700 hover:text-pink-800 dark:text-pink-300 dark:hover:text-pink-200",
    accordionBackground: "bg-pink-50/50 dark:bg-pink-900/20",
    accordionBorder: "border-pink-200 dark:border-pink-800",
    accordionIcon: "text-pink-500 dark:text-pink-400",
  },
  gray: {
    name: "Neutral Gray",
    gradient: "from-white to-gray-100",
    accent1: "bg-gray-200 dark:bg-gray-700",
    accent2: "bg-gray-300 dark:bg-gray-600",
    titleGradient:
      "from-gray-700 to-gray-500 dark:from-gray-400 dark:to-gray-300",
    h1Gradient: "from-gray-800 to-gray-600 dark:from-gray-500 dark:to-gray-400",
    h2Gradient: "from-gray-700 to-gray-500 dark:from-gray-400 dark:to-gray-300",
    h3Gradient: "from-gray-600 to-gray-400 dark:from-gray-300 dark:to-gray-200",
    h4Gradient:
      "from-gray-700 to-slate-700 dark:from-gray-400 dark:to-slate-400",
    h5Gradient:
      "from-slate-700 to-gray-700 dark:from-slate-400 dark:to-gray-400",
    h6Gradient: "from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-500",
    buttonGradient:
      "from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700 dark:from-gray-600 dark:to-gray-500",
    buttonSoft:
      "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
    buttonOutlined:
      "border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
    buttonSubtle:
      "bg-gray-100/50 text-gray-800 hover:bg-gray-100 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800",
    featureBadge:
      "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700",
    bugBadge:
      "bg-gray-200 text-gray-700 hover:bg-gray-200 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600",
    accordionTrigger:
      "text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200",
    accordionBackground: "bg-gray-100/50 dark:bg-gray-800/50",
    accordionBorder: "border-gray-200 dark:border-gray-700",
    accordionIcon: "text-gray-500 dark:text-gray-400",
  },
  purple: {
    name: "Purple & Indigo",
    gradient: "from-white to-purple-50",
    accent1: "bg-purple-200 dark:bg-purple-700",
    accent2: "bg-indigo-200 dark:bg-indigo-700",
    titleGradient:
      "from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400",
    h1Gradient:
      "from-purple-700 to-indigo-700 dark:from-purple-500 dark:to-indigo-500",
    h2Gradient:
      "from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400",
    h3Gradient:
      "from-purple-500 to-indigo-500 dark:from-purple-300 dark:to-indigo-300",
    h4Gradient:
      "from-purple-600 to-violet-600 dark:from-purple-400 dark:to-violet-400",
    h5Gradient:
      "from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400",
    h6Gradient:
      "from-purple-500 to-purple-700 dark:from-purple-300 dark:to-purple-500",
    buttonGradient:
      "from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 dark:from-purple-500 dark:to-indigo-500",
    buttonSoft:
      "bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50",
    buttonOutlined:
      "border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/20",
    buttonSubtle:
      "bg-purple-100/50 text-purple-800 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:bg-purple-900/30",
    featureBadge:
      "bg-purple-50 text-purple-700 hover:bg-purple-50 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
    bugBadge:
      "bg-indigo-50 text-indigo-700 hover:bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
    accordionTrigger:
      "text-purple-700 hover:text-purple-800 dark:text-purple-300 dark:hover:text-purple-200",
    accordionBackground: "bg-purple-50/50 dark:bg-purple-900/20",
    accordionBorder: "border-purple-200 dark:border-purple-800",
    accordionIcon: "text-purple-500 dark:text-purple-400",
  },
  teal: {
    name: "Teal & Cyan",
    gradient: "from-white to-teal-50",
    accent1: "bg-teal-200 dark:bg-teal-700",
    accent2: "bg-cyan-200 dark:bg-cyan-700",
    titleGradient:
      "from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400",
    h1Gradient: "from-teal-700 to-cyan-700 dark:from-teal-500 dark:to-cyan-500",
    h2Gradient: "from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400",
    h3Gradient: "from-teal-500 to-cyan-500 dark:from-teal-300 dark:to-cyan-300",
    h4Gradient:
      "from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400",
    h5Gradient:
      "from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400",
    h6Gradient: "from-teal-500 to-teal-700 dark:from-teal-300 dark:to-teal-500",
    buttonGradient:
      "from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 dark:from-teal-500 dark:to-cyan-500",
    buttonSoft:
      "bg-teal-50 text-teal-700 hover:bg-teal-100 dark:bg-teal-900/30 dark:text-teal-300 dark:hover:bg-teal-900/50",
    buttonOutlined:
      "border-teal-300 text-teal-700 hover:bg-teal-50 dark:border-teal-700 dark:text-teal-300 dark:hover:bg-teal-900/20",
    buttonSubtle:
      "bg-teal-100/50 text-teal-800 hover:bg-teal-100 dark:bg-teal-900/20 dark:text-teal-300 dark:hover:bg-teal-900/30",
    featureBadge:
      "bg-teal-50 text-teal-700 hover:bg-teal-50 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800",
    bugBadge:
      "bg-cyan-50 text-cyan-700 hover:bg-cyan-50 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800",
    accordionTrigger:
      "text-teal-700 hover:text-teal-800 dark:text-teal-300 dark:hover:text-teal-200",
    accordionBackground: "bg-teal-50/50 dark:bg-teal-900/20",
    accordionBorder: "border-teal-200 dark:border-teal-800",
    accordionIcon: "text-teal-500 dark:text-teal-400",
  },
  amber: {
    name: "Amber & Yellow",
    gradient: "from-white to-amber-50",
    accent1: "bg-amber-200 dark:bg-amber-700",
    accent2: "bg-yellow-200 dark:bg-yellow-700",
    titleGradient:
      "from-amber-500 to-yellow-500 dark:from-amber-400 dark:to-yellow-400",
    h1Gradient:
      "from-amber-600 to-yellow-600 dark:from-amber-500 dark:to-yellow-500",
    h2Gradient:
      "from-amber-500 to-yellow-500 dark:from-amber-400 dark:to-yellow-400",
    h3Gradient:
      "from-amber-400 to-yellow-400 dark:from-amber-300 dark:to-yellow-300",
    h4Gradient:
      "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400",
    h5Gradient:
      "from-orange-500 to-yellow-500 dark:from-orange-400 dark:to-yellow-400",
    h6Gradient:
      "from-amber-400 to-amber-600 dark:from-amber-300 dark:to-amber-500",
    buttonGradient:
      "from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 dark:from-amber-500 dark:to-yellow-500",
    buttonSoft:
      "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50",
    buttonOutlined:
      "border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/20",
    buttonSubtle:
      "bg-amber-100/50 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-900/30",
    featureBadge:
      "bg-amber-50 text-amber-700 hover:bg-amber-50 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
    bugBadge:
      "bg-yellow-50 text-yellow-700 hover:bg-yellow-50 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800",
    accordionTrigger:
      "text-amber-700 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-200",
    accordionBackground: "bg-amber-50/50 dark:bg-amber-900/20",
    accordionBorder: "border-amber-200 dark:border-amber-800",
    accordionIcon: "text-amber-500 dark:text-amber-400",
  },
};
export type ColorThemeKey = keyof typeof colorThemes;
export type ThemeMode = "light" | "dark";

// Define the context type
type ThemeContextType = {
  theme: ThemeMode;
  colorTheme: ColorThemeKey;
  currentTheme: (typeof colorThemes)[ColorThemeKey];
  toggleTheme: () => void;
  setColorTheme: (theme: ColorThemeKey) => void;
  isThemeLoaded: boolean;
};

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Props for the provider component
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
  defaultColorTheme?: ColorThemeKey;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  defaultColorTheme = "blue",
}: ThemeProviderProps) {
  // Initialize state with default values
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme);
  const [colorTheme, setColorTheme] =
    useState<ColorThemeKey>(defaultColorTheme);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Load saved theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    const savedColorTheme = localStorage.getItem(
      "colorTheme"
    ) as ColorThemeKey | null;

    if (savedTheme) {
      setTheme(savedTheme);
    }

    if (savedColorTheme && colorThemes[savedColorTheme]) {
      setColorTheme(savedColorTheme);
    }

    setIsThemeLoaded(true);
  }, []);

  // Update localStorage and apply theme when theme changes
  useEffect(() => {
    if (!isThemeLoaded) return;

    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, isThemeLoaded]);

  // Update localStorage when color theme changes
  useEffect(() => {
    if (!isThemeLoaded) return;
    localStorage.setItem("colorTheme", colorTheme);
  }, [colorTheme, isThemeLoaded]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Set the color theme
  const handleSetColorTheme = (newTheme: ColorThemeKey) => {
    if (colorThemes[newTheme]) {
      setColorTheme(newTheme);
    }
  };

  // Get current theme colors
  const currentTheme = colorThemes[colorTheme];

  // Create the context value
  const contextValue: ThemeContextType = {
    theme,
    colorTheme,
    currentTheme,
    toggleTheme,
    setColorTheme: handleSetColorTheme,
    isThemeLoaded,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
