import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LocationPicker } from "./LocationPicker";
import { mockChartContext } from "@/__mocks__";
import React from "react";
import { SnackbarContext, ChartContext } from "@/context";

global.fetch = jest.fn();

const mockSetLoading = jest.fn();
const mockSetLocation = jest.fn();
const mockedShowMessage = jest.fn();

const renderWithContext = () =>
  render(
    <SnackbarContext.Provider value={{ showMessage: mockedShowMessage }}>
      <ChartContext.Provider
        value={{
          ...mockChartContext,
          setLoading: mockSetLoading,
        }}
      >
        <LocationPicker onLocationChanged={mockSetLocation} />
      </ChartContext.Provider>
    </SnackbarContext.Provider>
  );

describe("LocationPicker component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input and search button properly", () => {
    renderWithContext();

    const input = screen.getByRole("textbox");
    const searchButton = screen.getByRole("button", {
      name: "chart.create.search_city",
    });
    const cityLabel = screen.getByLabelText("chart.create.city");

    expect(input).toBeInTheDocument();
    expect(cityLabel).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it("display a warning toast if user tries to search without typing a city name", () => {
    renderWithContext();

    const searchButton = screen.getByRole("button", {
      name: "chart.create.search_city",
    });
    fireEvent.click(searchButton);
    expect(mockedShowMessage).toHaveBeenCalledWith(
      "chart.create.error.missing_city",
      "warning"
    );
  });

  it("fetches location and call onLocationChanged on search", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        locations: [
          {
            name: "Paris",
            displayName: "France",
            latitude: 48.8566,
            longitude: 2.3522,
          },
        ],
      }),
    });

    renderWithContext();

    const input = screen.getByLabelText("chart.create.city");
    fireEvent.change(input, { target: { value: "Paris" } });

    const searchButton = screen.getByRole("button", {
      name: "chart.create.search_city",
    });
    fireEvent.click(searchButton);

    expect(mockSetLoading).toHaveBeenCalledWith(true);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith("/api/get-geolocation?city=Paris")
    );

    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });

  it("displays a toast when no locations were found", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        locations: [],
      }),
    });

    renderWithContext();
    const input = screen.getByLabelText("chart.create.city");
    fireEvent.change(input, { target: { value: "PariXxX" } });
    const searchButton = screen.getByRole("button", {
      name: "chart.create.search_city",
    });
    fireEvent.click(searchButton);
    await waitFor(() =>
      expect(mockedShowMessage).toHaveBeenCalledWith(
        "chart.craete.error.no_results",
        "warning"
      )
    );
  });

  it("clears location when clear button is clicked", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        locations: [
          {
            name: "Paris",
            displayName: "France",
            latitude: 48.8566,
            longitude: 2.3522,
          },
        ],
      }),
    });

    renderWithContext();

    const input = screen.getByLabelText("chart.create.city");
    fireEvent.change(input, { target: { value: "Paris" } });

    const searchButton = screen.getByRole("button", {
      name: "chart.create.search_city",
    });
    fireEvent.click(searchButton);

    await waitFor(() => screen.getByLabelText("chart.create.clear_city"));
    fireEvent.click(screen.getByLabelText("chart.create.clear_city"));

    expect(mockSetLocation).toHaveBeenCalledWith(undefined);
  });
});
