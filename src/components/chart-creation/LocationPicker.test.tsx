import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LocationPicker } from "./LocationPicker";
import { ChartContext } from "@/context/ChartContext";
import { mockChartContext } from "@/__mocks__";
import React from "react";

// Mock fetch
global.fetch = jest.fn();

const mockSetLoading = jest.fn();
const mockSetLocation = jest.fn();

const renderWithContext = () =>
  render(
    <ChartContext.Provider
      value={{
        ...mockChartContext,
        setLoading: mockSetLoading,
        setLocation: mockSetLocation,
      }}
    >
      <LocationPicker />
    </ChartContext.Provider>
  );

describe("LocationPicker", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input and search button properly", () => {
    renderWithContext();

    const input = screen.getByRole("textbox");
    const searchButton = screen.getByRole("button", { name: "search city" });
    const cityLabel = screen.getByLabelText(/City/);

    expect(input).toBeInTheDocument();
    expect(cityLabel).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it("calls API and sets locations on search", async () => {
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

    const input = screen.getByLabelText(/City/);
    fireEvent.change(input, { target: { value: "Paris" } });

    const searchButton = screen.getByRole("button", { name: /search city/i });
    fireEvent.click(searchButton);

    expect(mockSetLoading).toHaveBeenCalledWith(true);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith("/api/get-geolocation?city=Paris")
    );
    screen.debug();
    expect(mockSetLoading).toHaveBeenCalledWith(false);
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

    const input = screen.getByLabelText(/City/);
    fireEvent.change(input, { target: { value: "Paris" } });

    const searchButton = screen.getByRole("button", { name: /search city/i });
    fireEvent.click(searchButton);

    await waitFor(() => screen.getByLabelText(/clear city/i));
    fireEvent.click(screen.getByLabelText(/clear city/i));

    expect(mockSetLocation).toHaveBeenCalledWith(undefined);
  });
});
