import { Grid, Box } from "@mui/material";
import { ChartHouse, ChartPlanet, Planet, ZodiacSign } from "@/lib/chart.types";
import { ZodiacSignIcon, PlanetIcon } from "@/components/icons";
import { PLANET_SIZE } from "@/lib/chart.consts";
import { useTranslations } from "next-intl";

interface ChartDataItemProps {
  itemData?: ChartPlanet | ChartHouse;
}

export function ChartDataItem({ itemData }: ChartDataItemProps) {
  const t = useTranslations();
  if (!itemData) {
    return <></>;
  }

  const { signIndex, degrees, minutes, seconds } = itemData;
  const icon =
    "planetIndex" in itemData ? (
      <PlanetIcon planet={itemData.planetIndex} />
    ) : (
      <Box sx={{ width: PLANET_SIZE }}>AC</Box>
    );

  const label =
    "planetIndex" in itemData
      ? t(`planet.${Planet[itemData.planetIndex]}`)
      : t(`chart.ascendant`);

  const signLabel = t(`zodiac_sign.${ZodiacSign[itemData.signIndex]}`);

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid container alignItems="center">
        {icon}
      </Grid>
      <Grid>{label}</Grid>
      <Grid container alignItems="center" sx={{ mx: 1 }}>
        <ZodiacSignIcon sign={signIndex} color="silver" />
        <Grid sx={{ color: "silver" }}>{signLabel}</Grid>
      </Grid>
      <Grid container size="grow" justifyContent="flex-end">
        {`${degrees}°${minutes}'${seconds}"`}
      </Grid>
    </Grid>
  );
}
