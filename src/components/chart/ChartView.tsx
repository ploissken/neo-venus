import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ChartContext } from "@/context/ChartContext";
import { useContext } from "react";
import { Typography } from "@mui/material";
import BaseChart from "@/components/chart/BaseChart";
import ChartPlanets from "./ChartPlanets";
import { CHART_DEFAULT_SIZE } from "@/lib/chart.consts";
import ChartHouses from "./ChartHouses";

interface ChartViewProps {
  size?: number;
}

export default function ChartView({
  size = CHART_DEFAULT_SIZE,
}: ChartViewProps) {
  const { chart } = useContext(ChartContext);

  const hasChart = chart && chart.planets?.length > 0;
  const ascendantLongitude = chart?.asc?.longitude || 0;

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
      {hasChart ? (
        <>
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <BaseChart size={size} rotationDegrees={-ascendantLongitude} />
          </Box>
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <ChartHouses size={size} houses={chart.houses} />
          </Box>
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <ChartPlanets
              chartPlanets={chart.planets}
              ascendantLongitude={ascendantLongitude}
              size={size}
            />
          </Box>
        </>
      ) : (
        <Typography sx={{ textAlign: "center" }}>select a date</Typography>
      )}
    </Grid>
  );
}
