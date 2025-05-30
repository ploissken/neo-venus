import { ChartMetadata, getNaiveDate } from "@/lib/chart";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export function ChartMetadataTable({ metadata }: { metadata: ChartMetadata }) {
  const t = useTranslations();
  const {
    inputDate: { naiveDate },
    utc,
  } = metadata;
  const naiveDateString = getNaiveDate(naiveDate, t);
  const naiveTimeString = `${naiveDate.hour}:${naiveDate.minute}`;
  const utcTime = `${utc.hour}:${utc.minute}`;
  return (
    <Grid container size={12} direction="column">
      <Typography variant="h6">{t("chart.metadata.title")}</Typography>
      <Grid
        container
        size={12}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          {metadata.name && <Typography>{metadata.name}</Typography>}
          <Typography>
            <strong>{t("chart.metadata.date")}: </strong>
            {naiveDateString}
          </Typography>
          <Typography>
            <strong>{t("chart.metadata.place")}: </strong>
            {metadata.location?.displayName}
          </Typography>
          <Typography>
            <strong>{t("chart.metadata.timezone")}:</strong> {metadata.timezone}
          </Typography>
        </Box>
        <Box>
          <Typography>
            <strong>{t("chart.metadata.time")}:</strong> {naiveTimeString}
          </Typography>
          <Typography>
            <strong>{t("chart.metadata.universal_time")}:</strong> {utcTime}
          </Typography>
          <Typography>
            <strong>{t("chart.metadata.julian_day")}:</strong>{" "}
            {metadata.julDayUT.toFixed(6)}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
