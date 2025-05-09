import {
  ANIMATION_HOUSE_DELAY,
  ANIMATION_ZODIAC_DURATION,
  HOUSE_WHEEL_PROPORTION,
  defaultDividerColor,
} from "@/lib/chart.consts";
import { ChartHouse } from "@/lib/chart.types";
import { motion } from "framer-motion";

interface HousesWheelProps {
  size: number;
  houses: ChartHouse[];
}

const DEFAULT_HOUSE_STROKE = 1;
const HIGHLIGHED_HOUSE_STROKE = 3;

export function HousesWheel({ size, houses }: HousesWheelProps) {
  const radius = HOUSE_WHEEL_PROPORTION * size;
  const majorHouseIndexes = [0, 3, 6, 9]; // ac, ic, dc, mc

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {houses.map(({ houseIndex, renderLongitude }) => {
        const isMajorHouse = majorHouseIndexes.includes(houseIndex);
        const angleRad = (renderLongitude * Math.PI) / 180;
        const x2 = size / 2 + radius * Math.cos(angleRad);
        const y2 = size / 2 + radius * Math.sin(angleRad);

        return (
          <motion.line
            key={houseIndex}
            x1={size / 2}
            y1={size / 2}
            initial={{ x2: size / 2, y2: size / 2 }}
            animate={{ x2, y2 }}
            transition={{
              delay:
                ANIMATION_ZODIAC_DURATION + houseIndex * ANIMATION_HOUSE_DELAY,
              duration: 0.1,
              ease: "easeOut",
            }}
            stroke={defaultDividerColor.house}
            strokeWidth={
              isMajorHouse ? HIGHLIGHED_HOUSE_STROKE : DEFAULT_HOUSE_STROKE
            }
          />
        );
      })}
      <defs>
        <radialGradient id="inner-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#444" />
          <stop offset="100%" stopColor="#111" />
        </radialGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 10}
        fill="url(#inner-gradient)"
      />
    </svg>
  );
}
