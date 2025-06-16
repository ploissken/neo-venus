import { render, screen, fireEvent } from "@testing-library/react";
import { DrawerMenu } from "./DrawerMenu";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock("../logo", () => ({
  LogoWithTitle: () => <div data-testid="mock-logo">LogoWithTitle</div>,
}));

jest.mock("@/context", () => ({
  useUser: () => ({
    isLoggedIn: true,
    logout: jest.fn(),
  }),
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
    expect(screen.queryByText("menu.home")).not.toBeInTheDocument();
    expect(screen.queryByText("menu.about")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-logo")).not.toBeInTheDocument();

    fireEvent.click(menuButton);

    expect(screen.getByText("menu.home")).toBeInTheDocument();
    expect(screen.getByText("menu.about")).toBeInTheDocument();
    expect(screen.getByTestId("mock-logo")).toBeInTheDocument();
  });
});
