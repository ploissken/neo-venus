"use client";
import { Grid, Theme, Typography } from "@mui/material";
import { ChartController } from "../create-chart/ChartController";
import { useCreateChart } from "@/hooks/useCreateChart";
import { useEffect, useState } from "react";
import { Chart } from "@/lib/chart.types";
import { useSnackbar } from "@/hooks";
import { useTranslations } from "next-intl";

export default function HomeContainer() {
  const createChart = useCreateChart();
  const { showMessage } = useSnackbar();
  const t = useTranslations();
  const [chart, setChart] = useState<Chart | undefined>();

  useEffect(() => {
    createChart({
      referenceDate: new Date(),
    }).then((chartResult) => {
      if ("error" in chartResult) {
        showMessage(t(`chart.create.error.${chartResult.error}`), "error");
      } else {
        setChart(chartResult);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid
      data-testid="home-container"
      container
      justifyContent="center"
      sx={(theme: Theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        p: 2,
        m: 2,
      })}
    >
      {chart && <Typography variant="h4">Current sky</Typography>}
      {chart && <ChartController chart={chart} />}
    </Grid>
  );
}
