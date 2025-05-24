import { Grid } from "@mui/material";
import { ChartForm, ChartFormInputs } from "./ChartForm";
import { BackendErrorResponse, Chart, ChartLocation } from "@/lib";
import { useCreateChart } from "@/hooks/useCreateChart";
import { useSnackbar } from "@/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChartPreview } from "./ChartPreview";
import { useAuthFetch } from "@/hooks/useAuthFetch";

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
  const authFetch = useAuthFetch();

  const onChartDataReady = async ({
    location,
    date,
    name,
  }: ChartFormInputs) => {
    setLoading(true);
    const chartData = {
      name,
      referenceDate: date,
      ...location,
    };
    setChartData({ location, date, name });
    const chartResult = await createChart(chartData);
    if ("error" in chartResult) {
      showMessage(t(`chart.create.error.${chartResult.error}`), "error");
    } else {
      setChart(chartResult);
    }
    setLoading(false);
  };

  const handleSaveChart = async () => {
    setLoading(true);
    authFetch("/api/save-chart", {
      method: "POST",
      body: JSON.stringify(chartData),
    })
      .then(async (response) => {
        // todo: define persisted chart type
        const fetchData: { persistedChart: unknown } | BackendErrorResponse =
          await response.json();

        if ("persistedChart" in fetchData) {
          showMessage(
            t(`form.chart.save_success`, { chartName: chartData?.name || "" }),
            "info"
          );
          onStepComplete();
        } else {
          showMessage(t(`form.profile.error.${fetchData.error}`), "error");
        }
      })
      .finally(() => setLoading(false));
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
      {chart && chartData ? (
        <ChartPreview
          chart={chart}
          chartData={chartData}
          loading={loading}
          locations={locations}
          onEdit={() => setChart(undefined)}
          onSave={handleSaveChart}
        />
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
