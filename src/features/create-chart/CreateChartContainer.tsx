"use client";
import { Grid, Theme } from "@mui/material";
import { ChartProvider } from "@/context/ChartContext";
import { ChartController } from "./ChartController";
import { ChartCreationMenu } from "@/components/chart-creation";
import { Chart } from "@/lib/chart.types";
import { useState } from "react";

export default function CreateChartContainer() {
  const [chart, setChart] = useState<Chart | undefined>();
  return (
    <ChartProvider>
      <Grid
        data-testid="create-chart-container"
        container
        justifyContent="center"
        alignContent="center"
        sx={{ p: 2 }}
      >
        <Grid
          container
          spacing={2}
          size={{ xs: 12, lg: 11 }}
          sx={(theme: Theme) => ({
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
          })}
          justifyContent="center"
        >
          <ChartCreationMenu onChartCreated={setChart} />
          {chart && <ChartController chart={chart} />}
        </Grid>
      </Grid>
    </ChartProvider>
  );
}
