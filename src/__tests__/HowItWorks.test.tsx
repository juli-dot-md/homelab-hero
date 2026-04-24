import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HowItWorks } from "../components/HowItWorks";

describe("<HowItWorks>", () => {
  it("renders expanded by default", () => {
    render(<HowItWorks />);
    expect(screen.getByText(/the sheet/i)).toBeInTheDocument();
  });

  it("the toggle button is present", () => {
    render(<HowItWorks />);
    expect(screen.getByRole("button", { name: /how does this work/i })).toBeInTheDocument();
  });

  it("toggle button has aria-expanded=true when expanded", () => {
    render(<HowItWorks />);
    expect(screen.getByRole("button", { name: /how does this work/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("clicking the toggle collapses the content", () => {
    render(<HowItWorks />);
    fireEvent.click(screen.getByRole("button", { name: /how does this work/i }));
    expect(screen.getByRole("region", { hidden: true })).toHaveAttribute("aria-hidden", "true");
  });

  it("clicking the toggle again expands the content", () => {
    render(<HowItWorks />);
    const btn = screen.getByRole("button", { name: /how does this work/i });
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.getByRole("region")).toHaveAttribute("aria-hidden", "false");
  });

  it("toggle button has aria-expanded=false when collapsed", () => {
    render(<HowItWorks />);
    fireEvent.click(screen.getByRole("button", { name: /how does this work/i }));
    expect(screen.getByRole("button", { name: /how does this work/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("expanded state shows all 4 section headings", () => {
    render(<HowItWorks />);
    expect(screen.getByText("The Sheet")).toBeInTheDocument();
    expect(screen.getByText("Themes")).toBeInTheDocument();
    expect(screen.getByText(/export.*import.*sharing/i)).toBeInTheDocument();
    expect(screen.getByText("Privacy")).toBeInTheDocument();
  });

  it("collapsed state hides the content region visually via aria-hidden", () => {
    render(<HowItWorks />);
    fireEvent.click(screen.getByRole("button", { name: /how does this work/i }));
    expect(screen.getByRole("region", { hidden: true })).toHaveAttribute("aria-hidden", "true");
  });

  it("toggle button label indicates current state", () => {
    render(<HowItWorks />);
    const btn = screen.getByRole("button", { name: /how does this work/i });
    expect(btn.textContent).toMatch(/▲|▼/);
    fireEvent.click(btn);
    expect(btn.textContent).toMatch(/▲|▼/);
  });
});
