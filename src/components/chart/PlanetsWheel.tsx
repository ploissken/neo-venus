import { ChartPlanet } from "@/lib/chart.types";
import { PlanetIcon } from "@/components/icons";
import {
  ANIMATION_PLANET_DELAY,
  PLANET_MARKER_END,
  PLANET_MARKER_START,
  PLANET_SIZE,
  PLANET_WHEEL_PROPORTION,
} from "@/lib/chart.consts";
import { motion } from "framer-motion";

interface PlanetsWheelProps {
  chartPlanets: Array<ChartPlanet>;
  size: number;
  delayAnimation?: boolean;
}

export function PlanetsWheel({
  chartPlanets = [],
  size,
  delayAnimation = true,
}: PlanetsWheelProps) {
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
          delayAnimation={delayAnimation}
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
      {chartPlanets.map(({ planetIndex, renderMarker }) => {
        const angle = renderMarker * (Math.PI / 180);
        const x1 = center + markerStart * Math.cos(angle);
        const y1 = center + markerStart * Math.sin(angle);
        const x2 = center + markerEnd * Math.cos(angle);
        const y2 = center + markerEnd * Math.sin(angle);
        const animationDelay = delayAnimation ? 1.8 : 0;

        return (
          <motion.line
            key={planetIndex}
            x1={x1}
            y1={y1}
            stroke="white"
            strokeWidth={1}
            initial={{ x2: x1, y2: y1 }}
            animate={{ x2, y2 }}
            transition={{
              delay: animationDelay + planetIndex * ANIMATION_PLANET_DELAY,
              duration: 0.1,
              ease: "easeOut",
            }}
          />
        );
      })}
    </svg>
  );
}
