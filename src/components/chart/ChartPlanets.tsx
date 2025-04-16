import { ChartPlanet } from "@/lib/chart.types";
import PlanetIcon from "@/components/icons/PlanetIcon";
import {
  PLANET_MARKER_END,
  PLANET_MARKER_START,
  PLANET_SIZE,
  PLANET_WHEEL_PROPORTION,
} from "@/lib/chart.consts";

interface ChartPlanetsProps {
  chartPlanets: Array<ChartPlanet>;
  size: number;
}

export default function ChartPlanets({
  chartPlanets = [],
  size,
}: ChartPlanetsProps) {
  const radius = PLANET_WHEEL_PROPORTION * size - PLANET_SIZE / 2;
  const center = size / 2;
  const markerStart = PLANET_MARKER_START * radius;
  const markerEnd = PLANET_MARKER_END * radius;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {chartPlanets.map(({ planetIndex, renderLongitude }) => (
        <PlanetIcon
          key={planetIndex}
          planet={planetIndex}
          size={PLANET_SIZE}
          color="yellow"
          x={
            center +
            radius * Math.cos((renderLongitude * Math.PI) / 180) -
            PLANET_SIZE / 2
          }
          y={
            center +
            radius * Math.sin((renderLongitude * Math.PI) / 180) -
            PLANET_SIZE / 2
          }
        />
      ))}
      {chartPlanets.map(({ planetIndex, renderMarker }) => (
        <line
          key={planetIndex}
          x1={center + markerStart * Math.cos(renderMarker * (Math.PI / 180))}
          y1={center + markerStart * Math.sin(renderMarker * (Math.PI / 180))}
          x2={center + markerEnd * Math.cos(renderMarker * (Math.PI / 180))}
          y2={center + markerEnd * Math.sin(renderMarker * (Math.PI / 180))}
          stroke="white"
          strokeWidth={1}
        />
      ))}
    </svg>
  );
}
