import { render, screen } from "@testing-library/react";
import { ChartAspectsTable } from ".";
import { mockChart } from "@/__mocks__";
import { Planet } from "@/lib/chart";

jest.mock("@/components/icons", () => ({
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

    render(<ChartAspectsTable aspects={mockChart.aspects} />);

    const chatAspectsTitle = screen.getByText("chart.data.aspects");
    const planetIcons = screen.queryAllByText(/PlanetIcon/);
    const aspectIcons = screen.queryAllByText(/AspectIcon/);

    expect(chatAspectsTitle).toBeInTheDocument();
    expect(planetIcons).toHaveLength(planets.length);
    expect(aspectIcons).toHaveLength(mockChart.aspects.length);
  });
});
