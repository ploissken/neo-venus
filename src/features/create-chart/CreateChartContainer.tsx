"use client";
import { CircularProgress, Grid, Theme, Typography } from "@mui/material";
import { ChartController } from "./ChartController";
import { ChartCreationMenu } from "@/components/chart-creation";
import { Chart } from "@/lib/chart.types";
import { useState } from "react";
import { CHART_LARGE_SIZE } from "@/lib/chart.consts";
import { useTranslations } from "next-intl";
import { useChartContext } from "@/hooks";

export default function CreateChartContainer() {
  const [chart, setChart] = useState<Chart | undefined>();
  const t = useTranslations();
  const { loading } = useChartContext();

  return (
    <Grid
      data-testid="create-chart-container"
      container
      justifyContent="center"
      alignContent="center"
      sx={(theme: Theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        p: 2,
        m: 2,
      })}
    >
      <Grid
        container
        spacing={2}
        size={{ xs: 12, lg: 11 }}
        sx={{ minHeight: CHART_LARGE_SIZE }}
        justifyContent="center"
      >
        <ChartCreationMenu onChartCreated={setChart} />
        {chart && <ChartController chart={chart} />}
        {!chart && !loading && (
          <Typography>{t("chart.create.helper")}</Typography>
        )}
        {loading && (
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            sx={{ minHeight: CHART_LARGE_SIZE }}
          >
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
