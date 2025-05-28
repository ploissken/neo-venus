import { render, screen } from "@testing-library/react";
import { PlanetIcon } from ".";
import { Planet, PLANET_SIZE } from "@/lib/chart";

describe("PlanetIcon component", () => {
  it("renders planet icon properly", () => {
    const planets = [
      { planetId: Planet.Sun, id: "sun-icon" },
      { planetId: Planet.Moon, id: "moon-icon" },
      { planetId: Planet.Mercury, id: "mercury-icon" },
      { planetId: Planet.Venus, id: "venus-icon" },
      { planetId: Planet.Mars, id: "mars-icon" },
      { planetId: Planet.Jupiter, id: "jupiter-icon" },
      { planetId: Planet.Saturn, id: "saturn-icon" },
      { planetId: Planet.Uranus, id: "uranus-icon" },
      { planetId: Planet.Neptune, id: "neptune-icon" },
      { planetId: Planet.Pluto, id: "pluto-icon" },
    ];

    planets.forEach((planet) => {
      render(<PlanetIcon planet={planet.planetId} />);
      const planetIcon = screen.getByTestId(planet.id);
      expect(planetIcon).toBeInTheDocument();
    });
  });

  it("throws an error for unknown planet", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(<PlanetIcon planet={1337 as unknown as Planet} />)
    ).toThrow("Unknown planet identifier");
    spy.mockRestore();
  });

  it("applies default color, size and [x,y] coordinates if none provided", () => {
    render(<PlanetIcon planet={Planet.Saturn} />);
    const svg = screen.getByTestId("saturn-icon").closest("svg");
    expect(svg).toHaveAttribute("fill", "lightgrey");
    expect(svg).toHaveAttribute("width", `${PLANET_SIZE}`);
    expect(svg).toHaveAttribute("height", `${PLANET_SIZE}`);
    expect(svg).toHaveAttribute("x", "0");
    expect(svg).toHaveAttribute("y", "0");
  });

  it("applies custom color, size and [x,y] coordinates when provided", () => {
    render(
      <PlanetIcon planet={Planet.Saturn} color="red" size={50} x={10} y={20} />
    );
    const svg = screen.getByTestId("saturn-icon").closest("svg");
    expect(svg).toHaveAttribute("fill", "red");
    expect(svg).toHaveAttribute("width", "50");
    expect(svg).toHaveAttribute("height", "50");
    expect(svg).toHaveAttribute("x", "10");
    expect(svg).toHaveAttribute("y", "20");
  });
});
