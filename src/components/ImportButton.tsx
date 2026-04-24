import { useRef } from "react";

type Props = {
  onImport: (markdown: string) => void;
  label?: string;
  className?: string;
};

export function ImportButton({ onImport, label = "Import", className = "btn-ghost" }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // Reset so the same file can be re-selected after an error
    e.target.value = "";
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const markdown = ev.target?.result as string;
      onImport(markdown);
    };
    reader.readAsText(file);
  }

  return (
    <>
      <button
        type="button"
        className={className}
        aria-label={label}
        onClick={() => fileRef.current?.click()}
      >
        {label}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept=".md,text/markdown"
        className="hidden"
        onChange={handleChange}
      />
    </>
  );
}
