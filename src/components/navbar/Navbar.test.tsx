import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

// Mock dependencies
jest.mock("../logo", () => ({
  LogoWithTitle: () => <div data-testid="mock-logo">LogoWithTitle</div>,
}));

jest.mock("./DrawerMenu", () => ({
  DrawerMenu: () => <div data-testid="mock-drawer">DrawerMenu</div>,
}));

describe("Navbar component", () => {
  it("renders DrawerMenu, LogoWithTitle, and a disabled Login button", () => {
    render(<Navbar />);

    expect(screen.getByTestId("mock-logo")).toBeInTheDocument();
    expect(screen.getByTestId("mock-drawer")).toBeInTheDocument();

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });
});
