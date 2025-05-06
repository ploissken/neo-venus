import { fireEvent, render, screen } from "@testing-library/react";
import CreateChartContainer from "./CreateChartContainer";
import { SnackbarContext } from "@/context";

jest.mock("./ChartController", () => ({
  ChartController: jest.fn(() => <div>ChartController</div>),
}));

jest.mock("../../components/chart-creation", () => ({
  ChartCreationMenu: ({
    onChartCreated,
  }: {
    onChartCreated: (chart: unknown) => void;
  }) => <button onClick={() => onChartCreated({})}>ChartCreationMenu</button>,
}));

const mockedShowMessage = jest.fn();
const renderComponent = () => {
  render(
    <SnackbarContext.Provider value={{ showMessage: mockedShowMessage }}>
      <CreateChartContainer />
    </SnackbarContext.Provider>
  );
};

describe("CreateChartContainer component", () => {
  it("renders the CreateChartContainer with ChartCreationMenu", () => {
    renderComponent();
    expect(screen.queryByText("ChartController")).not.toBeInTheDocument();
    expect(screen.getByText("ChartCreationMenu")).toBeInTheDocument();
  });

  it("renders the ChartController when chart is present", () => {
    renderComponent();
    expect(screen.queryByText("ChartController")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("ChartCreationMenu"));
    expect(screen.getByText("ChartController")).toBeInTheDocument();
  });
});
