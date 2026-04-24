import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Tooltip } from "../components/Tooltip";

const DESC = "Your security strategy and hardening approach.";

describe("<Tooltip>", () => {
  it("renders children", () => {
    render(<Tooltip description={DESC}><span>Ward Strength</span></Tooltip>);
    expect(screen.getByText("Ward Strength")).toBeInTheDocument();
  });

  it("renders a ? icon", () => {
    render(<Tooltip description={DESC}><span>Label</span></Tooltip>);
    expect(screen.getByLabelText("More information")).toBeInTheDocument();
  });

  it("tooltip bubble is present in the DOM", () => {
    render(<Tooltip description={DESC}><span>Label</span></Tooltip>);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("tooltip bubble contains the description text", () => {
    render(<Tooltip description={DESC}><span>Label</span></Tooltip>);
    expect(screen.getByRole("tooltip")).toHaveTextContent(DESC);
  });

  it("tooltip bubble is not visible by default (no is-open class)", () => {
    render(<Tooltip description={DESC}><span>Label</span></Tooltip>);
    const bubble = screen.getByRole("tooltip");
    expect(bubble).not.toHaveClass("is-open");
  });

  it("clicking the ? icon opens the tooltip (adds is-open class)", () => {
    render(<Tooltip description={DESC}><span>Label</span></Tooltip>);
    const icon = screen.getByLabelText("More information");
    fireEvent.click(icon);
    expect(screen.getByRole("tooltip")).toHaveClass("is-open");
  });

  it("clicking the ? icon again closes the tooltip", () => {
    render(<Tooltip description={DESC}><span>Label</span></Tooltip>);
    const icon = screen.getByLabelText("More information");
    fireEvent.click(icon);
    fireEvent.click(icon);
    expect(screen.getByRole("tooltip")).not.toHaveClass("is-open");
  });

  it("clicking outside closes an open tooltip", () => {
    render(
      <div>
        <Tooltip description={DESC}><span>Label</span></Tooltip>
        <button type="button">Outside</button>
      </div>
    );
    const icon = screen.getByLabelText("More information");
    fireEvent.click(icon);
    expect(screen.getByRole("tooltip")).toHaveClass("is-open");
    fireEvent.mouseDown(screen.getByText("Outside"));
    expect(screen.getByRole("tooltip")).not.toHaveClass("is-open");
  });

  it("wrapper has aria-describedby pointing to the tooltip id", () => {
    render(<Tooltip description={DESC}><span>Label</span></Tooltip>);
    const bubble = screen.getByRole("tooltip");
    const tooltipId = bubble.id;
    expect(tooltipId).toBeTruthy();
    const wrapper = bubble.closest("[aria-describedby]");
    expect(wrapper).toHaveAttribute("aria-describedby", tooltipId);
  });
});
