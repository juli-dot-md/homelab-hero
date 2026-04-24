import { createContext, useContext, useEffect, useState } from "react";
import { type Theme, type ThemeId, defaultTheme, themes } from "./index";

const STORAGE_KEY = "homelab-hero-theme";

type ThemeContextValue = {
  themeId: ThemeId;
  theme: Theme;
  setTheme: (id: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  themeId: defaultTheme,
  theme: themes[defaultTheme],
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && stored in themes ? (stored as ThemeId) : defaultTheme;
  });

  const theme = themes[themeId];

  // Swap theme class on <html> and update Google Fonts
  useEffect(() => {
    const html = document.documentElement;
    // Remove any existing theme classes
    html.classList.remove(...Object.values(themes).map((t) => t.className));
    html.classList.add(theme.className);

    // Update font link
    const existing = document.getElementById("theme-fonts");
    const href = `https://fonts.googleapis.com/css2?${theme.fonts.googleFonts}&display=swap`;
    if (existing) {
      (existing as HTMLLinkElement).href = href;
    } else {
      const link = document.createElement("link");
      link.id = "theme-fonts";
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }, [theme]);

  function setTheme(id: ThemeId) {
    localStorage.setItem(STORAGE_KEY, id);
    setThemeId(id);
  }

  return <ThemeContext.Provider value={{ themeId, theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
