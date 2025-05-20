import { Button, Grid, Typography } from "@mui/material";
import { ChartForm, ChartFormInputs } from "./ChartForm";
import { Chart, ChartLocation } from "@/lib";
import { useCreateChart } from "@/hooks/useCreateChart";
import { useSnackbar } from "@/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import AstralChart from "@/components/chart/AstralChart";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
dayjs.extend(utc);

export function ChartStepContainer({
  onStepComplete,
}: {
  onStepComplete: () => void;
}) {
  const createChart = useCreateChart();
  const { showMessage } = useSnackbar();
  const t = useTranslations();
  const [chart, setChart] = useState<Chart | undefined>();
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<ChartFormInputs | undefined>();
  const [locations, setLocations] = useState<ChartLocation[]>([]);

  const onChartDataReady = async ({ location, date }: ChartFormInputs) => {
    setLoading(true);
    const chartData = {
      referenceDate: new Date(dayjs(date).utc(true).format()),
      ...location,
    };
    setChartData({ location, date });
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
      data-testid="identity-step-container"
      container
      size={12}
      direction="column"
      sx={{
        py: 4,
        gap: 2,
      }}
    >
      {chart ? (
        <Grid container size={12} direction="column" alignContent="center">
          <Grid container size={12} direction="column" alignContent="center">
            {chartData && <Typography>{JSON.stringify(chartData)}</Typography>}
            <AstralChart chart={chart} />
          </Grid>

          <Grid container size={12} sx={{ gap: 2 }}>
            <Grid container size="grow" direction="column">
              <Button variant="contained" onClick={() => setChart(undefined)}>
                {t("form.chart.edit")}
              </Button>
            </Grid>
            <Grid container size="grow" direction="column">
              <Button type="submit" variant="contained">
                {t("form.chart.save")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <ChartForm
          onChartDataReady={onChartDataReady}
          onLocationsLoaded={setLocations}
          chartData={chartData}
          startingLocations={locations}
          loading={loading}
          disabled={loading}
        />
      )}
    </Grid>
  );
}
