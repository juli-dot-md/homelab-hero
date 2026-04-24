import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HowItWorks } from "../components/HowItWorks";

describe("<HowItWorks>", () => {
  it("renders collapsed by default", () => {
    render(<HowItWorks />);
    expect(screen.getByRole("region", { hidden: true })).toHaveAttribute("aria-hidden", "true");
  });

  it("the toggle button is present", () => {
    render(<HowItWorks />);
    expect(screen.getByRole("button", { name: /how does this work/i })).toBeInTheDocument();
  });

  it("toggle button has aria-expanded=false when collapsed", () => {
    render(<HowItWorks />);
    expect(screen.getByRole("button", { name: /how does this work/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("clicking the toggle expands the content", () => {
    render(<HowItWorks />);
    fireEvent.click(screen.getByRole("button", { name: /how does this work/i }));
    expect(screen.getByRole("region")).toHaveAttribute("aria-hidden", "false");
  });

  it("toggle button has aria-expanded=true when expanded", () => {
    render(<HowItWorks />);
    fireEvent.click(screen.getByRole("button", { name: /how does this work/i }));
    expect(screen.getByRole("button", { name: /how does this work/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("clicking the toggle again collapses the content", () => {
    render(<HowItWorks />);
    const btn = screen.getByRole("button", { name: /how does this work/i });
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.getByRole("region", { hidden: true })).toHaveAttribute("aria-hidden", "true");
  });

  it("expanded state shows all 4 section headings", () => {
    render(<HowItWorks />);
    fireEvent.click(screen.getByRole("button", { name: /how does this work/i }));
    expect(screen.getByText("The Sheet")).toBeInTheDocument();
    expect(screen.getByText("Themes")).toBeInTheDocument();
    expect(screen.getByText(/export.*import.*sharing/i)).toBeInTheDocument();
    expect(screen.getByText("Privacy")).toBeInTheDocument();
  });

  it("sharing section mentions GitHub Gist and public URL options", () => {
    render(<HowItWorks />);
    fireEvent.click(screen.getByRole("button", { name: /how does this work/i }));
    expect(screen.getByText(/github gist/i)).toBeInTheDocument();
    expect(screen.getByText(/pastebin/i)).toBeInTheDocument();
  });

  it("toggle button label indicates current state", () => {
    render(<HowItWorks />);
    const btn = screen.getByRole("button", { name: /how does this work/i });
    expect(btn.textContent).toMatch(/▲|▼/);
    fireEvent.click(btn);
    expect(btn.textContent).toMatch(/▲|▼/);
  });
});
