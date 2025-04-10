import { ChartPlanet } from "@/lib/chart.types";
import PlanetIcon from "@/app/components/PlanetIcon";

interface ChartPlanetsProps {
  chartPlanets: Array<ChartPlanet>;
  ascendant: number;
  size: number;
}

export default function ChartPlanets({
  chartPlanets = [],
  ascendant,
  size,
}: ChartPlanetsProps) {
  const radius = 0.34 * size;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {chartPlanets.map(({ planetIndex, longitude }, index) => (
        <PlanetIcon
          key={index}
          planet={planetIndex}
          size={20}
          color="yellow"
          x={
            size / 2 +
            radius * Math.cos(((longitude + ascendant) * -1 * Math.PI) / 180)
          }
          y={
            size / 2 +
            radius * Math.sin(((longitude + ascendant) * -1 * Math.PI) / 180)
          }
        />
      ))}
    </svg>
  );
}
