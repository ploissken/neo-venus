import React from "react";
import { Grid, Typography } from "@mui/material";
import { Chart, CHART_LARGE_SIZE } from "@/lib/chart";
import { ChartDataTable, ChartAspectsTable } from "@/components/chart/data";
import { useTranslations } from "next-intl";
import AstralChart from "@/components/chart/drawings/AstralChart";
import { ChartMetadataTable } from "@/components/chart/data/ChartMetadataTable";
import { ChartElementsTable } from "@/components/chart/data/ChartElementsTable";

export function ChartController({ chart }: { chart: Chart }) {
  const t = useTranslations();
  const hasChart = chart && chart.planets?.length > 0;

  return (
    <Grid container size={12} alignContent="start">
      {hasChart && (
        <Grid
          container
          size={{ xs: 12, lg: 4 }}
          sx={{ gap: 4 }}
          order={{ xs: 2, lg: 1 }}
        >
          <ChartMetadataTable metadata={chart.metadata} />
          <ChartElementsTable elements={chart.elements} />
          <ChartDataTable planets={chart.planets} ascendant={chart.asc} />
          <ChartAspectsTable aspects={chart.aspects} />
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
          <AstralChart chart={chart} />
        ) : (
          <Typography variant="h5" textAlign="center" sx={{ px: 2 }}>
            {t("chart.create.helper")}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
