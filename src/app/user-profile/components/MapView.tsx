import Grid from "@mui/material/Grid";
import { ChartPlanet, Planet } from "@/lib/chart.types";
import PlanetIcon from "@/app/components/PlanetIcon";
import BaseChart from "./BaseChart";

interface MapViewProps {
  chartPlanets: Array<ChartPlanet>;
}

export default function MapView({ chartPlanets = [] }: MapViewProps) {
  const size = 500;
  return (
    <Grid
      size={12}
      sx={{
        m: 4,
        position: "relative",
        top: 0,
        left: 0,
        width: size,
        height: size,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <BaseChart size={size} rotationDegrees={-35} />
      </div>

      {/* planets */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <svg width={size} height={size} viewBox="0 0 400 400">
          <circle cx={80 + 12} cy={145 + 12} r="18" stroke="#111" fill="#333" />
          <PlanetIcon
            planet={Planet.Sun}
            size={25}
            color="yellow"
            x={80}
            y={145}
          />
          <circle cx={160 + 12} cy={80 + 12} r="18" stroke="#111" fill="#333" />
          <PlanetIcon
            planet={Planet.Moon}
            size={25}
            color="cyan"
            x={160}
            y={80}
          />
          <circle
            cx={160 + 12}
            cy={300 + 12}
            r="18"
            stroke="#111"
            fill="#333"
          />
          <PlanetIcon
            planet={Planet.Mars}
            size={25}
            color="red"
            x={160}
            y={300}
          />
        </svg>
      </div>
    </Grid>
  );
}
