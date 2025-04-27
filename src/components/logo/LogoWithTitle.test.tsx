import { render, screen } from "@testing-library/react";
import { LogoWithTitle } from "./LogoWithTitle";
import { LogoProps } from "./Logo";

// Mock the Logo component so we don’t test its internals again
jest.mock("./Logo", () => ({
  Logo: ({ size, color }: LogoProps) => (
    <div>
      {size} - {color}
    </div>
  ),
}));

describe("LogoWithTitle component", () => {
  it("renders the logo and title with given props", () => {
    render(<LogoWithTitle size={50} color="gold" />);

    const title = screen.getByText("mercuryou");
    const logo = screen.getByText("50 - gold");
    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title.tagName.toLowerCase()).toBe("h5");
  });
});
