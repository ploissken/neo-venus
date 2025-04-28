import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import ChartView from "@/components/chart/ChartView";
import {
  CHART_SMALL_SIZE,
  CHART_DEFAULT_SIZE,
  CHART_LARGE_SIZE,
} from "@/lib/chart.consts";
import { ChartCreationMenu } from "@/components/chart-creation";
import { ChartDataTable, ChartAspectsTable } from "@/components/chart-data";
import { ChartContext } from "@/context/ChartContext";

export function ChartController() {
  const [isHydrated, setIsHydrated] = useState(false);

  const { chart } = useContext(ChartContext);

  const hasChart = chart && chart.planets?.length > 0;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const chartSize = isSmallScreen
    ? CHART_SMALL_SIZE
    : isLargeScreen
    ? CHART_LARGE_SIZE
    : CHART_DEFAULT_SIZE;

  // avoids layout shift with useMediaQuery
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  if (!isHydrated) {
    return;
  }

  return (
    <Grid container spacing={2}>
      <ChartCreationMenu />
      {hasChart && (
        <Grid size={{ xs: 12, lg: 4 }} sx={{ p: 2 }} order={{ xs: 2, lg: 1 }}>
          <ChartDataTable />
          <ChartAspectsTable />
        </Grid>
      )}
      <Grid
        container
        size={hasChart ? { xs: 12, lg: 8 } : 12}
        justifyContent="center"
        order={{ xs: 1, lg: 2 }}
        sx={{ minHeight: chartSize }}
      >
        {hasChart ? (
          <ChartView size={chartSize} />
        ) : (
          <Typography variant="h5">
            Select a date and city to draw a chart
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
