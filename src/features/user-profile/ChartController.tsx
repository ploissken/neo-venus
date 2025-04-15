import React from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import ChartView from "@/components/chart/ChartView";
import ChartDataTable from "@/components/chart/ChartDataTable";
import ChartCreationMenu from "../../components/chart/ChartCreationMenu";
import {
  CHART_SMALL_SIZE,
  CHART_DEFAULT_SIZE,
  CHART_LARGE_SIZE,
} from "@/lib/chart.consts";
import ChartAspectsTable from "@/components/chart/ChartAspectsTable";

export default function ChartController() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const chartSize = isSmallScreen
    ? CHART_SMALL_SIZE
    : isLargeScreen
    ? CHART_LARGE_SIZE
    : CHART_DEFAULT_SIZE;

  return (
    <Grid container spacing={2}>
      <ChartCreationMenu />
      <Grid container size={{ xs: 12, lg: 8 }} justifyContent="center">
        <ChartView size={chartSize} />
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }} sx={{ p: 2 }}>
        <ChartDataTable />
        <ChartAspectsTable />
      </Grid>
    </Grid>
  );
}
