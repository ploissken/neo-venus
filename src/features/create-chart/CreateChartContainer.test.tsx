import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import CreateChartContainer from "./CreateChartContainer";
import { SnackbarContext } from "@/context";
import { mockChart } from "@/__mocks__";

jest.mock("./ChartController", () => ({
  ChartController: jest.fn(() => <div>ChartController</div>),
}));

jest.mock("../user/sign-up/chart-step/ChartForm", () => ({
  ChartForm: ({
    onChartDataReady,
  }: {
    onChartDataReady: (chart: unknown) => void;
  }) => <button onClick={() => onChartDataReady({})}>ChartForm</button>,
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
  it("renders the CreateChartContainer with ChartForm", () => {
    renderComponent();
    expect(screen.queryByText("ChartController")).not.toBeInTheDocument();
    expect(screen.getByText("ChartForm")).toBeInTheDocument();
  });

  it("renders the ChartController when chart is present", async () => {
    const mockFetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({
        data: { chart: mockChart },
      }),
    });
    global.fetch = mockFetch;
    renderComponent();
    expect(screen.queryByText("ChartController")).not.toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText("ChartForm"));
    });
    await waitFor(() =>
      expect(screen.getByText("ChartController")).toBeInTheDocument()
    );
  });
});
