import { Button, Grid } from "@mui/material";
import { ChartFormInputs } from "./ChartForm";
import { Chart, ChartLocation } from "@/lib/chart";
import { useTranslations } from "next-intl";
import AstralChart from "@/components/chart/drawings/AstralChart";
import { ChartMetadataTable } from "@/components/chart/data/ChartMetadataTable";

export function ChartPreview({
  chart,
  loading,
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

  return (
    <Grid container size={12} direction="column" alignContent="center">
      <Grid
        container
        size={12}
        direction="column"
        alignContent="center"
        alignItems="center"
      >
        <ChartMetadataTable metadata={chart.metadata} />
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
