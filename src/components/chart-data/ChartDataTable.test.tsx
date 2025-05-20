import { render, screen } from "@testing-library/react";
import { ChartDataTable } from ".";
import { mockChart } from "@/__mocks__";

jest.mock("./ChartDataItem", () => ({
  ChartDataItem: jest.fn(() => <div>ChartDataItem</div>),
}));

describe("ChartDataTable component", () => {
  it("renders nothing when no planets are provided", () => {
    const { container } = render(<ChartDataTable planets={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders planet info and title properly", () => {
    render(<ChartDataTable planets={mockChart.planets} />);

    const chartDataTitle = screen.getByText("chart.data.title");
    const chartObjectData = screen.queryAllByText(/ChartDataItem/);

    expect(chartDataTitle).toBeInTheDocument();
    expect(chartObjectData).toHaveLength(mockChart.planets.length);
  });

  it("renders planets and ascendant info when provided", () => {
    render(
      <ChartDataTable
        planets={mockChart.planets}
        ascendant={mockChart.houses[0]}
      />
    );

    const chartObjectData = screen.queryAllByText(/ChartDataItem/);

    expect(chartObjectData).toHaveLength(mockChart.planets.length + 1);
  });
});
