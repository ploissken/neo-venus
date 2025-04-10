import Grid from "@mui/material/Grid";
import BaseChart from "./BaseChart";
import ChartPlanets from "./ChartPlanets";
import Box from "@mui/material/Box";
import { ChartContext } from "@/app/context/ChartContext";
import { useContext } from "react";
import { Typography } from "@mui/material";

interface MapViewProps {
  size?: number;
}

export default function MapView({ size = 500 }: MapViewProps) {
  const {
    chart: { planets: chartPlanets, asc: ascendant },
  } = useContext(ChartContext);

  const hasChart = chartPlanets.length > 0 && ascendant?.longitude;

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
            <BaseChart size={size} rotationDegrees={-ascendant.longitude} />
          </Box>

          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <ChartPlanets
              chartPlanets={chartPlanets}
              ascendant={ascendant.longitude}
              size={size}
            />
          </Box>
        </>
      ) : (
        <Typography>select a date</Typography>
      )}
    </Grid>
  );
}
