import { categories, themes } from "../themes";
import { useTheme } from "../themes/ThemeContext";
import type { ThemeId } from "../themes/types";

export function ThemePicker() {
  const { themeId, setTheme } = useTheme();

  return (
    <select
      className="theme-select"
      value={themeId}
      onChange={(e) => setTheme(e.target.value as ThemeId)}
      aria-label="Select theme"
      title="Select theme"
    >
      {categories.map((cat) => (
        <optgroup key={cat.label} label={cat.label}>
          {cat.themeIds.map((id) => (
            <option key={id} value={id}>
              {themes[id].label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
