"use client";
import { Grid } from "@mui/material";
import { ChartProvider } from "@/context/ChartContext";
import { ChartController } from "../create-chart/ChartController";

export default function HomeContainer() {
  return (
    <ChartProvider>
      <Grid
        data-testid="home-container"
        container
        justifyContent="center"
        sx={{ p: 2 }}
      >
        <ChartController />
      </Grid>
    </ChartProvider>
  );
}
