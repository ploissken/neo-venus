import { Button, Grid, Typography } from "@mui/material";
import { ChartFormInputs } from "./ChartForm";
import { Chart, ChartLocation } from "@/lib";
import { useTranslations } from "next-intl";
import AstralChart from "@/components/chart/drawings/AstralChart";

export function ChartPreview({
  chart,
  chartData,
  loading,
  locations,
  onEdit,
  onSave,
}: {
  chart: Chart;
  chartData: ChartFormInputs;
  loading: boolean;
  locations: ChartLocation[];
  onEdit: () => void;
  onSave: () => void;
}) {
  const t = useTranslations();
  const chartLocation = locations.find(
    (loc) =>
      loc.latitude === chartData.location.latitude &&
      loc.longitude === chartData.location.longitude
  );

  return (
    <Grid container size={12} direction="column" alignContent="center">
      <Grid
        container
        size={12}
        direction="column"
        alignContent="center"
        alignItems="center"
      >
        {/* todo: improve chart metadata display */}
        <Typography>{chartData.name}</Typography>
        <Typography>{chartData.date}</Typography>
        <Typography>{chartLocation?.displayName}</Typography>
        <AstralChart chart={chart} />
      </Grid>

      <Grid container size={12} sx={{ gap: 2 }}>
        <Grid container size="grow" direction="column">
          <Button variant="contained" onClick={onEdit} disabled={loading}>
            {t("form.chart.edit")}
          </Button>
        </Grid>
        <Grid container size="grow" direction="column">
          <Button
            type="submit"
            variant="contained"
            onClick={onSave}
            loading={loading}
            disabled={loading}
          >
            {t("form.chart.save")}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
