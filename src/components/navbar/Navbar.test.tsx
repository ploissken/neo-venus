import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

jest.mock("@/context", () => ({
  useUser: () => ({
    isLoggedIn: true,
    logout: jest.fn(),
  }),
}));

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock("../logo", () => ({
  LogoWithTitle: () => <div data-testid="mock-logo">LogoWithTitle</div>,
}));

jest.mock("./DrawerMenu", () => ({
  DrawerMenu: () => <div data-testid="mock-drawer">DrawerMenu</div>,
}));

jest.mock("./LocaleSwitcher", () => ({
  LocaleSwitcher: () => <div data-testid="mock-locale">LocaleSwitcher</div>,
}));

describe("Navbar component", () => {
  it("renders DrawerMenu, LogoWithTitle", () => {
    render(<Navbar />);

    expect(screen.getByTestId("mock-logo")).toBeInTheDocument();
    expect(screen.getByTestId("mock-drawer")).toBeInTheDocument();
    expect(screen.getByTestId("mock-locale")).toBeInTheDocument();
  });
});
