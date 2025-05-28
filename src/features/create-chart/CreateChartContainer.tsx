"use client";
import { CircularProgress, Grid, Theme, Typography } from "@mui/material";
import { ChartController } from "./ChartController";
import { Chart, CHART_LARGE_SIZE } from "@/lib/chart";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSnackbar, useCreateChart } from "@/hooks";
import {
  ChartForm,
  ChartFormInputs,
} from "../user/sign-up/chart-step/ChartForm";

export default function CreateChartContainer() {
  const [chart, setChart] = useState<Chart | undefined>();
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const createChart = useCreateChart();
  const { showMessage } = useSnackbar();

  const handleChartCreation = async ({ location, date }: ChartFormInputs) => {
    setLoading(true);
    const chartData = {
      referenceDate: date,
      ...location,
    };
    const chartResult = await createChart(chartData);
    if ("error" in chartResult) {
      showMessage(t(`chart.create.error.${chartResult.error}`), "error");
    } else {
      setChart(chartResult);
    }
    setLoading(false);
  };

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
        <ChartForm
          onChartDataReady={handleChartCreation}
          disabled={loading}
          displayStyle="row"
        />
        {loading ? (
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            sx={{ minHeight: CHART_LARGE_SIZE }}
          >
            <CircularProgress />
          </Grid>
        ) : chart ? (
          <ChartController chart={chart} />
        ) : (
          <Grid
            container
            spacing={2}
            size={{ xs: 12, lg: 11 }}
            sx={{ minHeight: CHART_LARGE_SIZE }}
            justifyContent="center"
          >
            <Typography>{t("chart.create.helper")}</Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
