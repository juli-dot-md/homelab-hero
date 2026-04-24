import { useEffect, useId, useRef, useState } from "react";

type Props = {
  description: string;
  children: React.ReactNode;
};

export function Tooltip({ description, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipId = useId();

  // Close on mousedown outside
  useEffect(() => {
    if (!isOpen) return;
    function handleOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  return (
    <span
      ref={wrapperRef}
      className="tooltip-wrapper"
      aria-describedby={tooltipId}
    >
      {children}
      <button
        type="button"
        className="tooltip-icon"
        aria-label="More information"
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
      >
        ?
      </button>
      <span
        id={tooltipId}
        role="tooltip"
        className={`tooltip-bubble${isOpen ? " is-open" : ""}`}
      >
        {description}
      </span>
    </span>
  );
}
