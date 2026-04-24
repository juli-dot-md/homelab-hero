import { useId, useState } from "react";

type Section = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

const SECTIONS: Section[] = [
  {
    heading: "The Sheet",
    paragraphs: [
      "Fill out the form to describe your homelab: give it a name, a backstory, and fill in the attributes (reliability, cost, security, etc.). Add hardware components, services, and any custom fields you want to track. Everything auto-saves to your browser as you type.",
    ],
  },
  {
    heading: "Themes",
    paragraphs: [
      "Pick a visual theme from the dropdown — Fantasy or Sci-Fi, each with several variants. The theme changes the look, the labels, and the example placeholder text. Your actual data stays the same regardless of which theme is active.",
    ],
  },
  {
    heading: "Export, Import & Sharing",
    paragraphs: [
      "In the editor, the Markdown button opens a panel with your sheet as a .md file — plain text you can read in any editor. You can copy it, download it, or paste in a different sheet to import it.",
      "To share with a link, host the .md file somewhere public, then paste the direct URL to the plain file (not the provider's page around it) into the Share panel. A few easy options:",
    ],
    bullets: [
      "GitHub Gist (gist.github.com) — paste your markdown into a new public gist, then click Raw. Free, no repo needed.",
      "GitHub repository — upload your .md file to a public repo, open the file, click Raw.",
      "Pastebin, paste.ee, or any other public paste service — paste the content and use the raw URL.",
    ],
  },
  {
    heading: "Privacy",
    paragraphs: [
      "Everything is stored in your browser's localStorage. Nothing is sent to any server. Clearing your browser data will erase your sheet — export it first if you want to keep it.",
    ],
  },
];

export function HowItWorks() {
  const [open, setOpen] = useState(false);
  const regionId = useId();

  return (
    <div className="how-it-works w-full">
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
        style={
          open ? undefined : { visibility: "hidden", height: 0, overflow: "hidden", padding: 0 }
        }
      >
        {SECTIONS.map((s) => (
          <div key={s.heading} className="how-it-works-section">
            <h3 className="how-it-works-heading">{s.heading}</h3>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="how-it-works-text">
                {p}
              </p>
            ))}
            {s.bullets && (
              <ul className="how-it-works-bullets">
                {s.bullets.map((b, i) => (
                  <li key={i} className="how-it-works-text">
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <p className="how-it-works-text how-it-works-share-footer">
          Once you have the raw URL, go to the Preview page, click Share, paste the URL, and copy
          the generated link.
        </p>
      </div>
    </div>
  );
}
