"use client";
import { Grid, Theme, Typography } from "@mui/material";
import { ChartProvider } from "@/context/ChartContext";
import { ChartController } from "./ChartController";
import { ChartCreationMenu } from "@/components/chart-creation";
import { Chart } from "@/lib/chart.types";
import { useState } from "react";
import { CHART_LARGE_SIZE } from "@/lib/chart.consts";
import { useTranslations } from "next-intl";

export default function CreateChartContainer() {
  const [chart, setChart] = useState<Chart | undefined>();
  const t = useTranslations();
  return (
    <ChartProvider>
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
          {!chart && <Typography>{t("chart.create.helper")}</Typography>}
        </Grid>
      </Grid>
    </ChartProvider>
  );
}
