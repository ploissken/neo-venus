import { render, screen } from "@testing-library/react";
import CreateChartContainer from "./CreateChartContainer";

jest.mock("./ChartController", () => ({
  ChartController: jest.fn(() => <div>ChartController</div>),
}));

describe("CreateChartContainer", () => {
  it("renders the CreateChartContainer with ChartController", () => {
    render(<CreateChartContainer />);
    expect(screen.getByText("ChartController")).toBeInTheDocument();
  });
});
