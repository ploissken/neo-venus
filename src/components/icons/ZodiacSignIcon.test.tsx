import { render, screen } from "@testing-library/react";
import { ZodiacSignIcon } from ".";
import { ZodiacSign, ZODIAC_SIGN_SIZE } from "@/lib/chart";

describe("ZodiacSignIcon component", () => {
  it("renders zodiac sign icon properly", () => {
    const signs = [
      { signId: ZodiacSign.Aries, id: "aries-icon" },
      { signId: ZodiacSign.Taurus, id: "taurus-icon" },
      { signId: ZodiacSign.Gemini, id: "gemini-icon" },
      { signId: ZodiacSign.Cancer, id: "cancer-icon" },
      { signId: ZodiacSign.Leo, id: "leo-icon" },
      { signId: ZodiacSign.Virgo, id: "virgo-icon" },
      { signId: ZodiacSign.Libra, id: "libra-icon" },
      { signId: ZodiacSign.Scorpio, id: "scorpio-icon" },
      { signId: ZodiacSign.Sagittarius, id: "sagittarius-icon" },
      { signId: ZodiacSign.Capricorn, id: "capricorn-icon" },
      { signId: ZodiacSign.Aquarius, id: "aquarius-icon" },
      { signId: ZodiacSign.Pisces, id: "pisces-icon" },
    ];

    signs.forEach((sign) => {
      render(<ZodiacSignIcon sign={sign.signId} />);
      const renderedIcon = screen.getByTestId(sign.id);
      expect(renderedIcon).toBeInTheDocument();
    });
  });

  it("throws an error for unknown zodiac sign", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(<ZodiacSignIcon sign={1337 as unknown as ZodiacSign} />)
    ).toThrow("Unknown zodiac sign identifier");
    spy.mockRestore();
  });

  it("applies default color and size if none provided", () => {
    render(<ZodiacSignIcon sign={ZodiacSign.Scorpio} />);
    const svg = screen.getByTestId("scorpio-icon").closest("svg");
    expect(svg).toHaveAttribute("fill", "grey");
    expect(svg).toHaveAttribute("width", `${ZODIAC_SIGN_SIZE}`);
    expect(svg).toHaveAttribute("height", `${ZODIAC_SIGN_SIZE}`);
  });

  it("applies custom color and size when provided", () => {
    render(
      <ZodiacSignIcon sign={ZodiacSign.Scorpio} color="purple" size={50} />
    );
    const svg = screen.getByTestId("scorpio-icon").closest("svg");
    expect(svg).toHaveAttribute("fill", "purple");
    expect(svg).toHaveAttribute("width", "50");
    expect(svg).toHaveAttribute("height", "50");
  });
});
