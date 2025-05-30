import {
  Planet,
  ANIMATION_PLANET_DELAY,
  ANIMATION_ZODIAC_HOUSE_TOTAL,
  PLANET_SIZE,
} from "@/lib/chart";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Mercury,
  Venus,
  Mars,
  Jupiter,
  Saturn,
  Uranus,
  Neptune,
  Pluto,
} from "./planets";

interface PlanetIconProps {
  planet: Planet;
  color?: string;
  delayAnimation?: boolean;
  size?: number;
  x?: number;
  y?: number;
}

function getPlanetIcon(planet: Planet) {
  switch (planet) {
    case Planet.Sun:
      return <Sun />;
    case Planet.Moon:
      return <Moon />;
    case Planet.Mercury:
      return <Mercury />;
    case Planet.Venus:
      return <Venus />;
    case Planet.Mars:
      return <Mars />;
    case Planet.Jupiter:
      return <Jupiter />;
    case Planet.Saturn:
      return <Saturn />;
    case Planet.Uranus:
      return <Uranus />;
    case Planet.Neptune:
      return <Neptune />;
    case Planet.Pluto:
      return <Pluto />;
    default:
      throw new Error("Unknown planet identifier");
  }
}

export function PlanetIcon({
  planet,
  color = "lightgrey",
  size = PLANET_SIZE,
  delayAnimation = true,
  x = 0,
  y = 0,
}: PlanetIconProps) {
  const planetIcon = getPlanetIcon(planet);
  const animationDelay = delayAnimation ? ANIMATION_ZODIAC_HOUSE_TOTAL : 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 35 35"
      fill={color}
      x={x}
      y={y}
    >
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 20,
          delay: animationDelay + ANIMATION_PLANET_DELAY * planet,
        }}
      >
        {planetIcon}
      </motion.g>
    </svg>
  );
}
