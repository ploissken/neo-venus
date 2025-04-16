import {
  HOUSE_WHEEL_PROPORTION,
  defaultDividerColor,
} from "@/lib/chart.consts";
import { ChartHouse } from "@/lib/chart.types";

interface ChartHousesProps {
  size: number;
  houses: ChartHouse[];
}

const DEFAULT_HOUSE_STROKE = 1;
const HIGHLIGHED_HOUSE_STROKE = 3;

export default function ChartHouses({ size, houses }: ChartHousesProps) {
  const radius = HOUSE_WHEEL_PROPORTION * size;
  const importantHouseMarkers = [0, 3, 6, 9]; // ac, ic, dc, mc

  return (
    <svg width={size} height={size} viewBox={`0, 0, ${size} ${size}`}>
      {houses.map(({ houseIndex, renderLongitude }) => (
        <line
          key={houseIndex}
          x1={size / 2}
          x2={size / 2 + radius * Math.cos((renderLongitude * Math.PI) / 180)}
          y1={size / 2}
          y2={size / 2 + radius * Math.sin((renderLongitude * Math.PI) / 180)}
          stroke={defaultDividerColor.house}
          strokeWidth={
            importantHouseMarkers.includes(houseIndex)
              ? HIGHLIGHED_HOUSE_STROKE
              : DEFAULT_HOUSE_STROKE
          }
        />
      ))}
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
