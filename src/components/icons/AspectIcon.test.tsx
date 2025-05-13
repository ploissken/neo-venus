import { render, screen } from "@testing-library/react";
import { AspectIcon } from ".";
import { Aspect } from "@/lib/chart.types";
import { ASPECT_SIZE } from "@/lib/chart.consts";

describe("AspectIcon component", () => {
  it("renders aspect icon properly", () => {
    const aspects = [
      { aspectId: Aspect.Conjunction, id: "conjunction-aspect" },
      { aspectId: Aspect.SemiSextile, id: "semisextile-aspect" },
      { aspectId: Aspect.SemiSquare, id: "semisquare-aspect" },
      { aspectId: Aspect.Sextile, id: "sextile-aspect" },
      { aspectId: Aspect.Quintile, id: "quintile-aspect" },
      { aspectId: Aspect.Square, id: "square-aspect" },
      { aspectId: Aspect.Trine, id: "trine-aspect" },
      { aspectId: Aspect.SesquiQuadrate, id: "sesquiquadrate-aspect" },
      { aspectId: Aspect.BiQuintile, id: "biquintile-aspect" },
      { aspectId: Aspect.Quincux, id: "quincux-aspect" },
      { aspectId: Aspect.Opposition, id: "opposition-aspect" },
    ];

    aspects.forEach((aspect) => {
      render(<AspectIcon aspect={aspect.aspectId} />);
      const aspectIcon = screen.getByTestId(aspect.id);
      expect(aspectIcon).toBeInTheDocument();
    });
  });

  it("throws an error for unknown aspects", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(<AspectIcon aspect={1337 as unknown as Aspect} />)
    ).toThrow("Unknown aspect identifier");
    spy.mockRestore();
  });

  it("applies default color, size and [x,y] coordinates if none provided", () => {
    render(<AspectIcon aspect={Aspect.Conjunction} />);
    const svg = screen.getByTestId("conjunction-aspect").closest("svg");
    expect(svg).toHaveAttribute("fill", "cyan");
    expect(svg).toHaveAttribute("width", `${ASPECT_SIZE}`);
    expect(svg).toHaveAttribute("height", `${ASPECT_SIZE}`);
    expect(svg).toHaveAttribute("x", "0");
    expect(svg).toHaveAttribute("y", "0");
  });

  it("applies custom size and [x,y] coordinates when provided", () => {
    render(<AspectIcon aspect={Aspect.Conjunction} size={50} x={10} y={20} />);
    const svg = screen.getByTestId("conjunction-aspect").closest("svg");
    expect(svg).toHaveAttribute("width", "50");
    expect(svg).toHaveAttribute("height", "50");
    expect(svg).toHaveAttribute("x", "10");
    expect(svg).toHaveAttribute("y", "20");
  });
});
