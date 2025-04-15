import { Planet } from "@/lib/chart.types";
import Sun from "../icons/planets/Sun";
import Jupiter from "../icons/planets/Jupiter";
import Mars from "../icons/planets/Mars";
import Mercury from "../icons/planets/Mercury";
import Moon from "../icons/planets/Moon";
import Neptune from "../icons/planets/Neptune";
import Pluto from "../icons/planets/Pluto";
import Saturn from "../icons/planets/Saturn";
import Uranus from "../icons/planets/Uranus";
import Venus from "../icons/planets/Venus";
import { PLANET_SIZE } from "@/lib/chart.consts";

interface PlanetIconProps {
  planet: Planet;
  color?: string;
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

export default function PlanetIcon({
  planet,
  color = "lightgrey",
  size = PLANET_SIZE,
  x = 0,
  y = 0,
}: PlanetIconProps) {
  const planetIcon = getPlanetIcon(planet);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 35 35"
      fill={color}
      x={x}
      y={y}
    >
      {planetIcon}
    </svg>
  );
}
