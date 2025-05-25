import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LocationPicker } from "./LocationPicker";
import React, { act } from "react";
import { SnackbarContext } from "@/context";
import { useFetch } from "@/hooks/useFetch";

global.fetch = jest.fn();
jest.mock("@/hooks/useFetch", () => ({
  useFetch: jest.fn(),
}));

const mockSetLocation = jest.fn();
const mockedShowMessage = jest.fn();
const parisLocation = {
  name: "Paris",
  displayName: "France",
  latitude: 48.8566,
  longitude: 2.3522,
};

const renderWithContext = () =>
  render(
    <SnackbarContext.Provider value={{ showMessage: mockedShowMessage }}>
      <LocationPicker onChange={mockSetLocation} />
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

  it("fetches location and call onChange on search", async () => {
    const mockFetchFn = jest.fn().mockResolvedValue({
      ok: true,
      data: {
        locations: [parisLocation],
      },
    });

    (useFetch as jest.Mock).mockReturnValue(mockFetchFn);

    renderWithContext();

    const input = screen.getByLabelText("chart.create.city");
    fireEvent.change(input, { target: { value: "Paris" } });

    await act(async () => {
      const searchButton = screen.getByRole("button", {
        name: "chart.create.search_city",
      });
      fireEvent.click(searchButton);
      expect(
        document.querySelector(".MuiIconButton-loadingIndicator")
      ).toBeInTheDocument();
    });

    await waitFor(() =>
      expect(mockFetchFn).toHaveBeenCalledWith(
        "/api/chart/get-geolocation?city=Paris"
      )
    );

    expect(
      document.querySelector(".MuiIconButton-loadingIndicator")
    ).not.toBeInTheDocument();
  });

  it("displays a toast when no locations were found", async () => {
    const mockFetchFn = jest.fn().mockResolvedValue({
      ok: true,
      data: {
        locations: [],
      },
    });

    (useFetch as jest.Mock).mockReturnValue(mockFetchFn);

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
    const mockFetchFn = jest.fn().mockResolvedValue({
      ok: true,
      data: {
        locations: [parisLocation],
      },
    });

    (useFetch as jest.Mock).mockReturnValue(mockFetchFn);

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
