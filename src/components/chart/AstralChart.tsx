import { Grid, Box, useMediaQuery } from "@mui/material";
import { CSSProperties } from "react";
import {
  CHART_DEFAULT_SIZE,
  CHART_LARGE_SIZE,
  CHART_SMALL_SIZE,
} from "@/lib/chart.consts";
import { AspectsWheel } from "./AspectsWheel";
import { HousesWheel } from "./HousesWheel";
import { PlanetsWheel } from "./PlanetsWheel";
import { ZodiacWheel } from "./ZodiacWheel";
import theme from "@/theme";
import { Chart } from "@/lib/chart.types";

export default function AstralChart({
  chart,
  size,
}: {
  chart: Chart;
  size?: number;
}) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const chartSize = isSmallScreen
    ? CHART_SMALL_SIZE
    : isLargeScreen
    ? CHART_LARGE_SIZE
    : CHART_DEFAULT_SIZE;

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
        my: 4,
        position: "relative",
        top: 0,
        left: 0,
        width: size || chartSize,
        height: size || chartSize,
        overflow: "hidden",
      }}
    >
      <Box style={absolutePosition}>
        <ZodiacWheel
          size={size || chartSize}
          rotationDegrees={-ascendantLongitude}
        />
      </Box>
      <Box style={absolutePosition}>
        <HousesWheel size={size || chartSize} houses={chart.houses} />
      </Box>
      <Box style={absolutePosition}>
        <PlanetsWheel
          chartPlanets={chart.planets}
          size={size || chartSize}
          delayAnimation={ascendantLongitude !== 0}
        />
      </Box>
      <Box style={absolutePosition}>
        <AspectsWheel
          planets={chart.planets}
          aspects={chart.aspects}
          size={size || chartSize}
          delayAnimation={ascendantLongitude !== 0}
        />
      </Box>
    </Grid>
  );
}
