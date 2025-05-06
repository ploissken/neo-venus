import React, { useContext } from "react";
import { Grid, Theme, Typography } from "@mui/material";
import { CHART_LARGE_SIZE } from "@/lib/chart.consts";
import { ChartCreationMenu } from "@/components/chart-creation";
import { ChartDataTable, ChartAspectsTable } from "@/components/chart-data";
import { ChartContext } from "@/context/ChartContext";
import { useTranslations } from "next-intl";
import AstralChart from "@/components/chart/AstralChart";

export function ChartController() {
  const t = useTranslations();

  const { chart } = useContext(ChartContext);

  const hasChart = chart && chart.planets?.length > 0;

  return (
    <Grid
      container
      spacing={2}
      size={{ xs: 12, lg: 11 }}
      sx={(theme: Theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
      })}
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
        alignContent="center"
        order={{ xs: 1, lg: 2 }}
        sx={{ minHeight: CHART_LARGE_SIZE }}
      >
        {hasChart ? (
          <AstralChart />
        ) : (
          <Typography variant="h5" textAlign="center" sx={{ px: 2 }}>
            {t("chart.create.helper")}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
