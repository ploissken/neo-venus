import { ZodiacSign } from "@/lib/chart.types";
import Aries from "../icons/signs/Aries";
import Aquarius from "../icons/signs/Aquarius";
import Cancer from "../icons/signs/Cancer";
import Capricorn from "../icons/signs/Capricorn";
import Gemini from "../icons/signs/Gemini";
import Leo from "../icons/signs/Leo";
import Libra from "../icons/signs/Libra";
import Pisces from "../icons/signs/Pisces";
import Sagittarius from "../icons/signs/Sagittarius";
import Scorpio from "../icons/signs/Scorpio";
import Taurus from "../icons/signs/Taurus";
import Virgo from "../icons/signs/Virgo";

interface ZodiacSignIconProps {
  sign: ZodiacSign;
  color?: string;
  size?: number;
}

function getSignIcon(sign: ZodiacSign) {
  switch (sign) {
    case ZodiacSign.Aries:
      return <Aries />;
    case ZodiacSign.Taurus:
      return <Taurus />;
    case ZodiacSign.Gemini:
      return <Gemini />;
    case ZodiacSign.Cancer:
      return <Cancer />;
    case ZodiacSign.Leo:
      return <Leo />;
    case ZodiacSign.Virgo:
      return <Virgo />;
    case ZodiacSign.Libra:
      return <Libra />;
    case ZodiacSign.Scorpio:
      return <Scorpio />;
    case ZodiacSign.Sagittarius:
      return <Sagittarius />;
    case ZodiacSign.Capricorn:
      return <Capricorn />;
    case ZodiacSign.Aquarius:
      return <Aquarius />;
    case ZodiacSign.Pisces:
      return <Pisces />;
    default:
      throw new Error("Unknown zodiac sign");
  }
}

export default function ZodiacSignIcon({
  sign,
  color = "grey",
  size = 20,
}: ZodiacSignIconProps) {
  const signIcon = getSignIcon(sign);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 35 35"
      role="presentation"
      fill={color}
    >
      {signIcon}
    </svg>
  );
}
