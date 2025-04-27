import { Grid, Box } from "@mui/material";
import { ChartContext } from "@/context/ChartContext";
import { CSSProperties, useContext } from "react";
import { CHART_DEFAULT_SIZE } from "@/lib/chart.consts";
import { AspectsWheel } from "./AspectsWheel";
import { HousesWheel } from "./HousesWheel";
import { PlanetsWheel } from "./PlanetsWheel";
import { ZodiacWheel } from "./ZodiacWheel";

interface ChartViewProps {
  size?: number;
}

export default function ChartView({
  size = CHART_DEFAULT_SIZE,
}: ChartViewProps) {
  const { chart } = useContext(ChartContext);

  const hasChart = chart && chart.planets?.length > 0;
  const ascendantLongitude = chart?.asc?.longitude || 0;
  const absolutePosition: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
  };

  if (!hasChart) {
    return;
  }

  return (
    <Grid
      size={12}
      alignContent="center"
      sx={{
        m: 4,
        position: "relative",
        top: 0,
        left: 0,
        width: size,
        height: size,
      }}
    >
      <Box style={absolutePosition}>
        <ZodiacWheel size={size} rotationDegrees={-ascendantLongitude} />
      </Box>
      <Box style={absolutePosition}>
        <HousesWheel size={size} houses={chart.houses} />
      </Box>
      <Box style={absolutePosition}>
        <PlanetsWheel chartPlanets={chart.planets} size={size} />
      </Box>
      <Box style={absolutePosition}>
        <AspectsWheel
          planets={chart.planets}
          aspects={chart.aspects}
          size={size}
        />
      </Box>
    </Grid>
  );
}
