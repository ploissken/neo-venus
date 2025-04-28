import { render, screen } from "@testing-library/react";
import HomeContainer from "./HomeContainer";

// Mocking ChartController as we are testing HomeContainer only
jest.mock("./ChartController", () => ({
  ChartController: jest.fn(() => <div>ChartController</div>),
}));

describe("HomeContainer", () => {
  it("renders the HomeContainer with ChartController", () => {
    render(<HomeContainer />);
    expect(screen.getByText("ChartController")).toBeInTheDocument();
  });
});
