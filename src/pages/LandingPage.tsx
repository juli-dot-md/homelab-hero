import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ThemePicker } from "../components/ThemePicker";
import { useSheetStore } from "../store";
import { useTheme } from "../themes/ThemeContext";

export function LandingPage() {
  const navigate = useNavigate();
  const { createNew, loadFromJson } = useSheetStore();
  const { theme } = useTheme();
  const { t, icons } = theme;
  const fileRef = useRef<HTMLInputElement>(null);

  function handleCreate() {
    createNew();
    navigate("/edit");
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const json = ev.target?.result as string;
      const ok = loadFromJson(json);
      if (ok) {
        navigate("/edit");
      } else {
        alert("Invalid homelab file. Please check the JSON and try again.");
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Theme picker — top right */}
      <div className="absolute top-4 right-4">
        <ThemePicker />
      </div>

      {/* Title */}
      <div className="text-center mb-12">
        <p className="font-display text-accent text-xs uppercase tracking-widest mb-3 opacity-80">
          {t.tagline}
        </p>
        <h1
          className="font-display text-accent font-bold mb-4"
          style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)" }}
          role="heading"
        >
          {t.appName}
        </h1>
        <div className="divider-rune my-6">{t.dividers.landing}</div>
        <p className="font-body text-[color:var(--color-text-base)] text-xl max-w-md mx-auto italic opacity-90">
          {t.subtitle}
        </p>
      </div>

      {/* Actions */}
      <div className="scroll-card corner-ornament w-full max-w-md">
        <div className="flex flex-col gap-4 relative z-10">
          <button type="button" className="btn-primary py-4 text-base" onClick={handleCreate}>
            {icons.create} {t.createBtn}
          </button>

          <div className="divider-rune">or</div>

          <button
            type="button"
            className="btn-ghost py-3"
            onClick={() => fileRef.current?.click()}
          >
            {icons.import} {t.importBtn}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={handleImport}
          />
        </div>
      </div>

      {/* Footer */}
      <p className="font-mono mt-12 text-faint opacity-60" style={{ fontSize: "0.7rem" }}>
        {t.noServer}
      </p>
    </div>
  );
}
