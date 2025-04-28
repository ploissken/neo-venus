import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ChartCreationMenu } from "./ChartCreationMenu";
import { ChartContext } from "@/context/ChartContext";
import { mockChartContext } from "@/__mocks__";
import React from "react";

// Mock fetch
global.fetch = jest.fn();
jest.mock("./LocationPicker", () => ({
  LocationPicker: jest.fn(() => <div>LocationPicker</div>),
}));
jest.mock("./DateTimePicker", () => ({
  DateTimePicker: jest.fn(() => <div>DateTimePicker</div>),
}));

const mockSetChart = jest.fn();
const mockSetLoading = jest.fn();
const mockChart = { title: "Test Chart" };
const latitude = 40.7128;
const longitude = -74.006;
const mockedDate = "2024-01-01T00:00:000Z";

const renderWithContext = (contextOverrides = {}) =>
  render(
    <ChartContext.Provider value={{ ...mockChartContext, ...contextOverrides }}>
      <ChartCreationMenu />
    </ChartContext.Provider>
  );

describe("ChartCreationMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a date-time picker, a location search input and a create chart button", () => {
    renderWithContext();

    const mockedDateTime = screen.getByText("DateTimePicker");
    const mockedLocation = screen.getByText("LocationPicker");
    const createButton = screen.getByRole("button", { name: "Create Chart" });

    expect(mockedDateTime).toBeInTheDocument();
    expect(mockedLocation).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();
    expect(createButton).toBeDisabled();
  });

  it("enables button when date and location are present", () => {
    renderWithContext({
      dateValue: new Date(mockedDate),
      location: { latitude, longitude },
    });
    expect(screen.getByRole("button", { name: /create chart/i })).toBeEnabled();
  });

  it("calls API and updates chart on create", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockChart,
    });

    renderWithContext({
      dateValue: new Date(mockedDate),
      location: { latitude, longitude },
      setLoading: mockSetLoading,
      setChart: mockSetChart,
    });

    const button = screen.getByRole("button", { name: /create chart/i });
    fireEvent.click(button);

    expect(mockSetLoading).toHaveBeenCalledWith(true);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/create-chart",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            latitude,
            longitude,
            referenceDate: new Date(mockedDate),
          }),
        })
      )
    );

    expect(mockSetChart).toHaveBeenCalledWith(mockChart);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });

  it("handles fetch error gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch failed"));
    jest.spyOn(console, "info").mockImplementation(() => {});

    renderWithContext({
      dateValue: new Date(mockedDate),
      location: { latitude, longitude },
      setLoading: mockSetLoading,
      setChart: mockSetChart,
    });

    fireEvent.click(screen.getByRole("button", { name: /create chart/i }));

    expect(mockSetLoading).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(mockSetChart).not.toHaveBeenCalled();
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });
});
