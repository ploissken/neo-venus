import { act, render, screen, waitFor } from "@testing-library/react";
import HomeContainer from "./HomeContainer";
import { SnackbarContext } from "@/context";
import { mockChart } from "@/__mocks__";

jest.mock("../create-chart/ChartController", () => ({
  ChartController: jest.fn(() => <div>ChartController</div>),
}));

const mockedShowMessage = jest.fn();
const mockCreateChart = jest.fn();

jest.mock("@/hooks", () => ({
  useCreateChart: () => mockCreateChart,
  useSnackbar: () => ({
    showMessage: mockedShowMessage,
  }),
}));

const renderComponent = () => {
  render(
    <SnackbarContext.Provider value={{ showMessage: mockedShowMessage }}>
      <HomeContainer />
    </SnackbarContext.Provider>
  );
};

describe("HomeContainer component", () => {
  it("renders the HomeContainer with ChartController", async () => {
    mockCreateChart.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({
        data: { chart: mockChart },
      }),
    });

    await act(async () => {
      renderComponent();
    });
    await waitFor(() => expect(mockCreateChart).toHaveBeenCalledTimes(1));

    expect(screen.getByText("ChartController")).toBeInTheDocument();
    expect(screen.getByText("chart.current_sky")).toBeInTheDocument();
  });
});
