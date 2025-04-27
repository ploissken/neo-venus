import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo component", () => {
  it("renders an SVG with default props", () => {
    render(<Logo size={100} color="white" />);

    const svg = screen.getByRole("img", { hidden: true });
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "100");
    expect(svg).toHaveAttribute("height", "100");

    const g = svg.querySelector("g");
    expect(g).toHaveAttribute("fill", "white");
  });

  it("applies custom size and color", () => {
    render(<Logo size={150} color="gold" />);

    const svg = screen.getByRole("img", { hidden: true });
    expect(svg).toHaveAttribute("width", "150");
    expect(svg).toHaveAttribute("height", "150");

    const g = svg.querySelector("g");
    expect(g).toHaveAttribute("fill", "gold");
  });
});
