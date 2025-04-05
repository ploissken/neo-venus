import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ChartPlanet, Planet, ZodiacSign } from "@/lib/chart.types";
import ZodiacSignIcon from "@/app/components/ZodiacSignIcon";
import PlanetIcon from "@/app/components/PlanetIcon";

interface MapViewProps {
  chartPlanets: Array<ChartPlanet>;
}

export default function MapView({ chartPlanets = [] }: MapViewProps) {
  return (
    <Grid
      size={12}
      sx={{
        position: "relative",
        top: 0,
        left: 0,
        width: "400px",
        height: "400px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <svg width="400" height="400" viewBox="0 0 400 400">
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="gray"
            strokeWidth="3"
            fill="transparent"
          />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
            (angle) => (
              <line
                x1="200"
                y1="200"
                x2={200 + 180 * Math.cos((angle * Math.PI) / 180)}
                y2={200 + 180 * Math.sin((angle * Math.PI) / 180)}
                stroke="gray"
                stroke-width="1"
              />
            )
          )}

          <circle
            cx="200"
            cy="200"
            r="140"
            stroke="gray"
            strokeWidth="3"
            fill="#111"
          />
          <circle cx="200" cy="200" r="60" fill="#333" />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <svg width="400" height="400" viewBox="0 0 400 400">
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
