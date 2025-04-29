import { render, screen, fireEvent } from "@testing-library/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "./DateTimePicker";
import { ChartContext, ChartContextType } from "@/context/ChartContext";
import { mockChartContext } from "@/__mocks__";

const renderComponent = (chartContext: ChartContextType) => {
  render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ChartContext.Provider value={chartContext}>
        <DateTimePicker />
      </ChartContext.Provider>
    </LocalizationProvider>
  );
};

describe("DateTimePicker", () => {
  it("renders with default label", () => {
    renderComponent(mockChartContext);

    const input = screen.getByLabelText("chart.create.date");
    expect(input).toBeInTheDocument();
  });

  it("calls setDateValue when a new date is selected", async () => {
    const mockSetDateValue = jest.fn();

    renderComponent({ ...mockChartContext, setDateValue: mockSetDateValue });
    expect(
      screen.queryByRole("option", { name: "AM" })
    ).not.toBeInTheDocument();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const amOption = screen.getByRole("option", { name: "AM" });
    fireEvent.click(amOption); // this will set the current date

    expect(mockSetDateValue).toHaveBeenCalled();
  });

  it("disables the picker when loading is true", () => {
    renderComponent({
      ...mockChartContext,
      loading: true,
    });

    const input = screen.getByLabelText("chart.create.date");
    expect(input).toBeDisabled();
  });
});
