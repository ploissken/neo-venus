import Grid from "@mui/material/Grid";
import { ChartPlanet, Planet } from "@/lib/chart.types";
import PlanetIcon from "@/app/components/PlanetIcon";
import BaseChart from "./BaseChart";

interface MapViewProps {
  chartPlanets: Array<ChartPlanet>;
  ascendant: number;
}

export default function MapView({
  chartPlanets = [],
  ascendant = 0,
}: MapViewProps) {
  const size = 500;
  const radius = 170;
  console.log("chartPlanets", chartPlanets);
  console.log("ascendant", ascendant);
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
        <BaseChart size={size} rotationDegrees={150 + (180 - ascendant)} />
      </div>

      {/* planets */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          // transform: "rotate(150deg)",
        }}
      >
        <svg width={size} height={size} viewBox="0 0 500 500">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="#aa00aa50" />
          {/* <circle
            cx={size / 2 - radius}
            cy={size / 2}
            r="18"
            stroke="#111"
            fill="#a0a"
          />
          <circle
            cx={size / 2 - radius}
            cy={size / 2 - radius}
            r="18"
            stroke="#111"
            fill="#a0a"
          /> */}
          {/* 
          x2={200 + 180 * Math.cos((angle * Math.PI) / 180)}
          y2={200 + 180 * Math.sin((angle * Math.PI) / 180)} 
          */}
          <PlanetIcon
            planet={Planet.Pluto}
            size={25}
            color="yellow"
            x={size / 2 - radius + radius + radius * Math.cos(0)}
            y={size / 2 - radius + radius + radius * Math.sin(0)}
            // x={size / 2 - radius}
            // y={size / 2}
          />
          <PlanetIcon
            planet={Planet.Sun}
            size={25}
            color="yellow"
            x={
              size / 2 -
              radius +
              radius +
              radius *
                Math.cos(
                  ((chartPlanets[0].longitude + 180 + ascendant) *
                    -1 *
                    Math.PI) /
                    180
                )
            }
            y={
              size / 2 -
              radius +
              radius +
              radius *
                Math.sin(
                  ((chartPlanets[0].longitude + 180 + ascendant) *
                    -1 *
                    Math.PI) /
                    180
                )
            }
          />
          {/* <circle cx={160 + 12} cy={80 + 12} r="18" stroke="#111" fill="#333" /> */}
          <PlanetIcon
            planet={Planet.Moon}
            size={25}
            color="cyan"
            x={
              size / 2 -
              radius +
              radius +
              radius *
                Math.cos(
                  ((chartPlanets[1].longitude + 180 + ascendant) *
                    -1 *
                    Math.PI) /
                    180
                )
            }
            y={
              size / 2 -
              radius +
              radius +
              radius *
                Math.sin(
                  ((chartPlanets[1].longitude + 180 + ascendant) *
                    -1 *
                    Math.PI) /
                    180
                )
            }
          />
          <PlanetIcon
            planet={Planet.Mercury}
            size={25}
            color="cyan"
            x={
              size / 2 -
              radius +
              radius +
              radius *
                Math.cos(
                  ((chartPlanets[2].longitude + 180 + ascendant) *
                    -1 *
                    Math.PI) /
                    180
                )
            }
            y={
              size / 2 -
              radius +
              radius +
              radius *
                Math.sin(
                  ((chartPlanets[2].longitude + 180 + ascendant) *
                    -1 *
                    Math.PI) /
                    180
                )
            }
          />
          <PlanetIcon
            planet={Planet.Venus}
            size={25}
            color="cyan"
            x={
              size / 2 -
              radius +
              radius +
              radius *
                Math.cos(
                  ((chartPlanets[3].longitude + 180 + ascendant) *
                    -1 *
                    Math.PI) /
                    180
                )
            }
            y={
              size / 2 -
              radius +
              radius +
              radius *
                Math.sin(
                  ((chartPlanets[3].longitude + 180 + ascendant) *
                    -1 *
                    Math.PI) /
                    180
                )
            }
          />
          {/* <circle
            cx={160 + 12}
            cy={300 + 12}
            r="18"
            stroke="#111"
            fill="#333"
          /> */}
          <PlanetIcon
            planet={Planet.Mars}
            size={25}
            color="red"
            x={
              size / 2 -
              radius +
              radius +
              radius *
                Math.cos(
                  ((chartPlanets[4].longitude + 180 + ascendant) *
                    -1 *
                    Math.PI) /
                    180
                )
            }
            y={
              size / 2 -
              radius +
              radius +
              radius *
                Math.sin(
                  ((chartPlanets[4].longitude + 180 + ascendant) *
                    -1 *
                    Math.PI) /
                    180
                )
            }
          />
          <PlanetIcon
            planet={Planet.Jupiter}
            size={25}
            color="red"
            x={
              size / 2 -
              radius +
              radius +
              radius *
                Math.cos(
                  ((chartPlanets[5].longitude + 180 + ascendant) *
                    -1 *
                    Math.PI) /
                    180
                )
            }
            y={
              size / 2 -
              radius +
              radius +
              radius *
                Math.sin(
                  ((chartPlanets[5].longitude + 180 + ascendant) *
                    -1 *
                    Math.PI) /
                    180
                )
            }
          />
        </svg>
      </div>
    </Grid>
  );
}
