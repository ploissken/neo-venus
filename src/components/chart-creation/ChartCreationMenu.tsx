"use client";
import { Button, Grid } from "@mui/material";
import { LocationPicker } from "./LocationPicker";
import { DateTimePicker } from "./DateTimePicker";
import { useTranslations } from "next-intl";
import { useChartContext, useSnackbar } from "@/hooks";
import { useCreateChart } from "@/hooks/useCreateChart";

export function ChartCreationMenu() {
  const t = useTranslations();
  const { dateValue, location, loading } = useChartContext();
  const { showMessage } = useSnackbar();

  const canFetchChart = dateValue && location;

  const createChart = useCreateChart();

  const handleCreate = async () => {
    if (!canFetchChart) {
      showMessage("missing data");
      return;
    } else {
      createChart();
    }
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
          onClick={handleCreate}
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
