import { render, screen } from "@testing-library/react";
import { ChartDataTable } from ".";
import { ChartContext } from "@/context/ChartContext";
import { mockChart, mockChartContext } from "@/__mocks__";

jest.mock("./PlanetSignDegreeItem", () => ({
  PlanetSignDegreeItem: jest.fn(() => <div>PlanetSignDegreeItem</div>),
}));

describe("ChartDataTable component", () => {
  it("renders nothing when chart isnt loaded on context", () => {
    const { container } = render(<ChartDataTable />);
    expect(container.firstChild).toBeNull();
  });

  it("renders planet info properly", () => {
    render(
      <ChartContext.Provider value={mockChartContext}>
        <ChartDataTable />
      </ChartContext.Provider>
    );

    const chartDataTitle = screen.getByText(/Planets, Signs and Degrees/);
    const chartObjectData = screen.queryAllByText(/PlanetSignDegreeItem/);

    expect(chartDataTitle).toBeInTheDocument();
    expect(chartObjectData).toHaveLength(mockChart.planets.length + 1); // + asc
  });
});
