import { ZodiacSign, ZODIAC_SIGN_SIZE } from "@/lib/chart";
import {
  Aries,
  Taurus,
  Gemini,
  Cancer,
  Leo,
  Virgo,
  Libra,
  Scorpio,
  Sagittarius,
  Capricorn,
  Aquarius,
  Pisces,
} from "./signs";

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
      throw new Error("Unknown zodiac sign identifier");
  }
}

export function ZodiacSignIcon({
  sign,
  color = "grey",
  size = ZODIAC_SIGN_SIZE,
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
