import { Planet } from "@/lib/chart.types";
import Sun from "./icons/planets/Sun";
import Jupiter from "./icons/planets/Jupiter";
import Mars from "./icons/planets/Mars";
import Mercury from "./icons/planets/Mercury";
import Moon from "./icons/planets/Moon";
import Neptune from "./icons/planets/Neptune";
import Pluto from "./icons/planets/Pluto";
import Saturn from "./icons/planets/Saturn";
import Uranus from "./icons/planets/Uranus";
import Venus from "./icons/planets/Venus";

interface PlanetIconProps {
  planet: Planet;
  color?: string;
  size?: number;
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
  color = "grey",
  size = 20,
}: PlanetIconProps) {
  const planetIcon = getPlanetIcon(planet);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 35 35"
      role="presentation"
      fill={color}
    >
      {planetIcon}
    </svg>
  );
}
