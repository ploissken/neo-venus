import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DrawerMenu } from "./DrawerMenu";

jest.mock("../logo", () => ({
  LogoWithTitle: () => <div data-testid="mock-logo">LogoWithTitle</div>,
}));

describe("DrawerMenu component", () => {
  it("renders the menu button", () => {
    render(<DrawerMenu />);
    const menuButton = screen.getByRole("button", { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it("opens the drawer when menu button is clicked", () => {
    render(<DrawerMenu />);
    const menuButton = screen.getByRole("button", { name: /menu/i });
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("About")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-logo")).not.toBeInTheDocument();

    fireEvent.click(menuButton);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByTestId("mock-logo")).toBeInTheDocument();
  });
});
