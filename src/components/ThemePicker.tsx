import { themeIds, themes } from "../themes";
import { useTheme } from "../themes/ThemeContext";

export function ThemePicker() {
  const { themeId, setTheme } = useTheme();

  return (
    <div className="flex gap-1 items-center">
      {themeIds.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => setTheme(id)}
          className="btn-ghost"
          style={{
            padding: "0.25rem 0.6rem",
            fontSize: "0.6rem",
            opacity: themeId === id ? 1 : 0.45,
            borderColor: themeId === id ? "var(--color-border-focus)" : undefined,
          }}
          aria-pressed={themeId === id}
          title={`Switch to ${themes[id].label} theme`}
        >
          {themes[id].label}
        </button>
      ))}
    </div>
  );
}
