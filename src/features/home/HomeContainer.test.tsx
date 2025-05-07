import { act, render, screen, waitFor } from "@testing-library/react";
import HomeContainer from "./HomeContainer";
import { SnackbarContext } from "@/context";
import { mockChart } from "@/__mocks__";

jest.mock("../create-chart/ChartController", () => ({
  ChartController: jest.fn(() => <div>ChartController</div>),
}));

jest.mock("@/hooks", () => ({
  useCreateChart: () => jest.fn(),
  useSnackbar: () => ({
    showMessage: mockedShowMessage,
  }),
}));

const mockedShowMessage = jest.fn();

const renderComponent = () => {
  render(
    <SnackbarContext.Provider value={{ showMessage: mockedShowMessage }}>
      <HomeContainer />
    </SnackbarContext.Provider>
  );
};

describe("HomeContainer component", () => {
  it("renders the HomeContainer with ChartController", async () => {
    const mockFetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({
        data: { chart: mockChart },
      }),
    });
    global.fetch = mockFetch;

    await act(async () => {
      renderComponent();
    });
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText("ChartController")).toBeInTheDocument();
    expect(screen.getByText("chart.current_sky")).toBeInTheDocument();
  });

  it("display a toast message when fetch fails", async () => {
    const mockFetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({
        error: "error_cause",
      }),
    });
    global.fetch = mockFetch;

    await act(async () => {
      renderComponent();
    });

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    expect(mockedShowMessage).toHaveBeenCalledWith(
      "chart.create.error.error_cause",
      "error"
    );
  });
});
