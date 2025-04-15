import { ChartPlanet } from "@/lib/chart.types";
import PlanetIcon from "@/components/chart/PlanetIcon";
import { CHART_PLANET_SIZE } from "@/lib/chart.consts";

interface ChartPlanetsProps {
  chartPlanets: Array<ChartPlanet>;
  size: number;
}

export default function ChartPlanets({
  chartPlanets = [],
  size,
}: ChartPlanetsProps) {
  const radius = 0.34 * size;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {chartPlanets.map(({ planetIndex, renderLongitude }, index) => (
        <PlanetIcon
          key={index}
          planet={planetIndex}
          size={CHART_PLANET_SIZE}
          color="yellow"
          x={size / 2 + radius * Math.cos((renderLongitude * Math.PI) / 180)}
          y={size / 2 + radius * Math.sin((renderLongitude * Math.PI) / 180)}
        />
      ))}
    </svg>
  );
}
