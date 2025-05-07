import { render, screen } from "@testing-library/react";
import { ChartAspectsTable } from ".";
import { ChartContext } from "@/context/ChartContext";
import { mockChart, mockChartContext } from "@/__mocks__";
import { Planet } from "@/lib/chart.types";

jest.mock("../icons", () => ({
  AspectIcon: jest.fn(() => <div>AspectIcon</div>),
  PlanetIcon: jest.fn(() => <div>PlanetIcon</div>),
}));

describe("ChartAspectsTable component", () => {
  it("renders nothing when no aspects are given", () => {
    const { container } = render(<ChartAspectsTable />);
    expect(container.firstChild).toBeNull();
  });

  it("renders planet and aspect icons properly", () => {
    const planets = Object.keys(Planet).filter((key) => isNaN(Number(key)));

    render(
      <ChartContext.Provider value={mockChartContext}>
        <ChartAspectsTable aspects={mockChart.aspects} />
      </ChartContext.Provider>
    );

    const chatAspectsTitle = screen.getByText("chart.data.aspects");
    const planetIcons = screen.queryAllByText(/PlanetIcon/);
    const aspectIcons = screen.queryAllByText(/AspectIcon/);

    expect(chatAspectsTitle).toBeInTheDocument();
    expect(planetIcons).toHaveLength(planets.length);
    expect(aspectIcons).toHaveLength(mockChart.aspects.length);
  });
});
