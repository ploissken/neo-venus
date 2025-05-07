"use client";
import { Button, Grid } from "@mui/material";
import { LocationPicker } from "./LocationPicker";
import { DateTimePicker } from "./DateTimePicker";
import { useTranslations } from "next-intl";
import { useChartContext, useSnackbar } from "@/hooks";
import { useCreateChart } from "@/hooks/useCreateChart";
import { Chart } from "@/lib/chart.types";

export interface ChartCreationMenuProps {
  onChartCreated: (chart: Chart) => void;
}

export function ChartCreationMenu({ onChartCreated }: ChartCreationMenuProps) {
  const t = useTranslations();
  const {
    dateValue,
    location,
    loading,
    setDateValue,
    setLocation,
    setLoading,
  } = useChartContext();
  const { showMessage } = useSnackbar();

  const canFetchChart = dateValue && location;

  const createChart = useCreateChart();

  const handleCreateChart = async () => {
    setLoading(true);
    const chartResult = await createChart({
      referenceDate: dateValue!,
      ...location,
    });
    if ("error" in chartResult) {
      showMessage(t(`chart.create.error.${chartResult.error}`), "error");
    } else {
      onChartCreated(chartResult);
    }
    setLoading(false);
  };

  return (
    <Grid container size={12} spacing={2} alignContent="start">
      <Grid size={{ xs: 12, lg: 4 }}>
        <DateTimePicker onDateChanged={setDateValue} />
      </Grid>

      <Grid size={{ xs: 12, lg: "grow" }}>
        <LocationPicker onLocationChanged={setLocation} />
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
          {t("chart.create.title")}
        </Button>
      </Grid>
    </Grid>
  );
}
