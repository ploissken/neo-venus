import { render, screen } from "@testing-library/react";
import { PlanetSignDegreeItem } from ".";
import { ChartHouse, ChartPlanet, Planet, ZodiacSign } from "@/lib/chart.types";

jest.mock("../icons/PlanetIcon", () => ({
  PlanetIcon: jest.fn(({ planet }) => <div>planet: {planet}</div>),
}));
jest.mock("../icons/ZodiacSignIcon", () => ({
  ZodiacSignIcon: jest.fn(({ sign }) => <div>sign: {sign}</div>),
}));

describe("ChartDetails component", () => {
  it("renders nothing when chartPlanet isnt provided", () => {
    const { container } = render(<PlanetSignDegreeItem />);
    expect(container.firstChild).toBeNull();
  });

  it("renders Ascendant info when chartPlanet is actually a ChartHouse", () => {
    const chartPlanet: ChartHouse = {
      signIndex: 0,
      longitude: 0,
      renderLongitude: 0,
      degrees: 0,
      minutes: 0,
      seconds: 0,
      houseIndex: 0,
    };

    render(<PlanetSignDegreeItem chartPlanet={chartPlanet} />);

    const ascendantLabel = screen.queryByText(/Ascendant/i);
    const ascendantIcon = screen.queryByText(/AC/i);

    expect(ascendantLabel).toBeInTheDocument();
    expect(ascendantIcon).toBeInTheDocument();
  });

  it("renders planet info properly", () => {
    const chartPlanet: ChartPlanet = {
      signIndex: ZodiacSign.Aquarius,
      longitude: 0,
      renderLongitude: 0,
      degrees: 1,
      minutes: 2,
      seconds: 3,
      planetIndex: Planet.Moon,
      renderMarker: 0,
    };

    render(<PlanetSignDegreeItem chartPlanet={chartPlanet} />);

    const planetIcon = screen.getByText(`planet: ${chartPlanet.planetIndex}`);
    const signIcon = screen.getByText(`sign: ${chartPlanet.signIndex}`);
    const degreeLabel = screen.getByText(
      `${chartPlanet.degrees}°${chartPlanet.minutes}'${chartPlanet.seconds}"`
    );

    expect(planetIcon).toBeInTheDocument();
    expect(signIcon).toBeInTheDocument();
    expect(degreeLabel).toBeInTheDocument();
  });
});
