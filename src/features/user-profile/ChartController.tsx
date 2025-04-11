import React from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import ChartView from "@/components/chart/ChartView";
import ChartDataTable from "@/components/chart/ChartDataTable";
import ChartCreationMenu from "../../components/chart/ChartCreationMenu";
import { CHART_SMALL_SIZE, CHART_DEFAULT_SIZE } from "@/lib/chart.consts";

export default function ChartController() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container spacing={2}>
      <ChartCreationMenu />
      <Grid container size={{ xs: 12, lg: 8 }} justifyContent="center">
        <ChartView
          size={isSmallScreen ? CHART_SMALL_SIZE : CHART_DEFAULT_SIZE}
        />
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }} sx={{ p: 2 }}>
        <ChartDataTable />
      </Grid>
    </Grid>
  );
}
