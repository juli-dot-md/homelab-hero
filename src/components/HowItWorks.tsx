import { useId, useState } from "react";

type Section = {
  heading: string;
  body: string;
};

const SECTIONS: Section[] = [
  {
    heading: "The Sheet",
    body: "Fill out the form to describe your homelab: give it a name, a backstory, and fill in the attributes (reliability, cost, security, etc.). Add hardware components, services, and any custom fields you want to track. Everything auto-saves to your browser as you type.",
  },
  {
    heading: "Themes",
    body: "Pick a visual theme from the dropdown — Fantasy or Sci-Fi, each with several variants. The theme changes the look, the labels, and the example placeholder text. Your actual data stays the same regardless of which theme is active.",
  },
  {
    heading: "Export, Import & Sharing",
    body: "In the editor, the Markdown button opens a panel showing your sheet as a .md file. You can copy it, download it, or paste in a different sheet to import it. To share your sheet, host the .md file somewhere public (GitHub, GitLab, any static host) and paste the raw file URL into the Share panel on the preview page. Anyone with the resulting share link can view your sheet — no account needed.",
  },
  {
    heading: "Privacy",
    body: "Everything is stored in your browser's localStorage. Nothing is sent to any server. Clearing your browser data will erase your sheet — export it first if you want to keep it.",
  },
];

export function HowItWorks() {
  const [open, setOpen] = useState(false);
  const regionId = useId();

  return (
    <div className="how-it-works w-full max-w-md" style={{ marginTop: "1rem" }}>
      <button
        type="button"
        className="how-it-works-toggle btn-ghost"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "▲" : "▼"} How does this work?
      </button>

      <div
        id={regionId}
        role="region"
        aria-hidden={!open}
        className="how-it-works-body"
        style={open ? undefined : { visibility: "hidden", height: 0, overflow: "hidden", padding: 0 }}
      >
        {SECTIONS.map((s) => (
          <div key={s.heading} className="how-it-works-section">
            <h3 className="how-it-works-heading">{s.heading}</h3>
            <p className="how-it-works-text">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
