import { Grid, Box } from "@mui/material";
import { ChartHouse, ChartPlanet, Planet } from "@/lib/chart.types";
import { ZodiacSignIcon, PlanetIcon } from "@/components/icons";
import { PLANET_SIZE } from "@/lib/chart.consts";

interface ChartDataItemProps {
  itemData?: ChartPlanet | ChartHouse;
}

export function ChartDataItem({ itemData }: ChartDataItemProps) {
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
    "planetIndex" in itemData ? `${Planet[itemData.planetIndex]}` : "Ascendant";

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid container alignItems="center">
        {icon}
      </Grid>
      <Grid>{label}</Grid>
      <Grid container alignItems="center" sx={{ mx: 1 }}>
        <ZodiacSignIcon sign={signIndex} />
      </Grid>
      <Grid container size="grow" justifyContent="flex-end">
        {`${degrees}°${minutes}'${seconds}"`}
      </Grid>
    </Grid>
  );
}
