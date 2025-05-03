import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import ChartView from "@/components/chart/ChartView";
import { CHART_LARGE_SIZE } from "@/lib/chart.consts";
import { ChartCreationMenu } from "@/components/chart-creation";
import { ChartDataTable, ChartAspectsTable } from "@/components/chart-data";
import { ChartContext } from "@/context/ChartContext";
import { useTranslations } from "next-intl";

export function ChartController() {
  const t = useTranslations();

  const { chart } = useContext(ChartContext);

  const hasChart = chart && chart.planets?.length > 0;

  return (
    <Grid
      container
      spacing={2}
      sx={{ minHeight: CHART_LARGE_SIZE }}
      alignContent="start"
    >
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
      >
        {hasChart ? (
          <ChartView />
        ) : (
          <Typography variant="h5" textAlign="center">
            {t("chart.create.helper")}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
