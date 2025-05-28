import { render, screen } from "@testing-library/react";
import { ChartDataItem } from ".";
import { ChartHouse, ChartPlanet, Planet, ZodiacSign } from "@/lib/chart";

jest.mock("@/components/icons", () => ({
  PlanetIcon: jest.fn(({ planet }) => <div>planet: {planet}</div>),
  ZodiacSignIcon: jest.fn(({ sign }) => <div>sign: {sign}</div>),
}));

describe("ChartDataItem component", () => {
  it("renders nothing when itemData isnt provided", () => {
    const { container } = render(<ChartDataItem />);
    expect(container.firstChild).toBeNull();
  });

  it("renders Ascendant info when a chartHouse is provided", () => {
    const itemData: ChartHouse = {
      signIndex: 0,
      longitude: 0,
      renderLongitude: 0,
      degrees: 3,
      minutes: 2,
      seconds: 1,
      houseIndex: 0,
    };

    render(<ChartDataItem itemData={itemData} />);

    const planetIcon = screen.queryByText(`planet:`);
    const ascendantLabel = screen.queryByText("chart.ascendant");
    const ascendantIcon = screen.queryByText(/AC/);
    const degreeLabel = screen.getByText(
      `${itemData.degrees}°${itemData.minutes}'${itemData.seconds}"`
    );

    expect(ascendantLabel).toBeInTheDocument();
    expect(ascendantIcon).toBeInTheDocument();
    expect(degreeLabel).toBeInTheDocument();
    expect(planetIcon).not.toBeInTheDocument();
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

    render(<ChartDataItem itemData={chartPlanet} />);

    const ascendantLabel = screen.queryByText(/Ascendant/i);
    const ascendantIcon = screen.queryByText(/AC/);
    const planetIcon = screen.getByText(`planet: ${chartPlanet.planetIndex}`);
    const planetLabel = screen.getByText(`planet.Moon`);
    const signIcon = screen.getByText(`sign: ${chartPlanet.signIndex}`);
    const signLabel = screen.getByText(`zodiac_sign.Aquarius`);
    const degreeLabel = screen.getByText(
      `${chartPlanet.degrees}°${chartPlanet.minutes}'${chartPlanet.seconds}"`
    );

    expect(ascendantLabel).not.toBeInTheDocument();
    expect(ascendantIcon).not.toBeInTheDocument();
    expect(planetIcon).toBeInTheDocument();
    expect(planetLabel).toBeInTheDocument();
    expect(signIcon).toBeInTheDocument();
    expect(signLabel).toBeInTheDocument();
    expect(degreeLabel).toBeInTheDocument();
  });
});
