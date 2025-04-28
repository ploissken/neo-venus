"use client";
import { Chart, ChartGenerationData } from "@/lib/chart.types";
import { Button, Grid } from "@mui/material";
import { LocationPicker } from "./LocationPicker";
import { DateTimePicker } from "./DateTimePicker";
import { useChartContext, useSnackbar } from "@/hooks";

type CreateChartResponse =
  | { ok: true; data: { chart: Chart } }
  | { ok: false; error: string };

export function ChartCreationMenu() {
  const { dateValue, location, loading, setChart, setLoading } =
    useChartContext();
  const { showMessage } = useSnackbar();

  const canFetchChart = dateValue && location;

  const handleCreateChart = async () => {
    if (!canFetchChart) {
      return;
    }

    setLoading(true);

    const chartData: ChartGenerationData = {
      latitude: location.latitude,
      longitude: location.longitude,
      referenceDate: dateValue,
    };

    const fetchResponse = await fetch("/api/create-chart", {
      method: "POST",
      body: JSON.stringify(chartData),
    });

    const response: CreateChartResponse = await fetchResponse.json();

    if (!response.ok) {
      showMessage(response.error, "error");
    } else {
      setChart(response.data.chart);
    }

    setLoading(false);
  };

  return (
    <Grid
      container
      size={12}
      spacing={2}
      sx={{
        justifyContent: "space-between",
        alignItems: "stretch",
      }}
    >
      <Grid size={{ xs: 12, lg: 4 }}>
        <DateTimePicker />
      </Grid>

      <Grid size={{ xs: 12, lg: "grow" }}>
        <LocationPicker />
      </Grid>
      <Grid size={{ xs: 12, lg: 2 }}>
        <Button
          variant="contained"
          onClick={handleCreateChart}
          disabled={!canFetchChart || loading}
          loading={loading}
          size="small"
          sx={{ width: "100%", height: (theme) => theme.spacing(7) }}
        >
          Create Chart
        </Button>
      </Grid>
    </Grid>
  );
}
