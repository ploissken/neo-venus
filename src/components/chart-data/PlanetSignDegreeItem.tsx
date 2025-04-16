import { Grid, Box } from "@mui/material";
import { ChartHouse, ChartPlanet, Planet } from "@/lib/chart.types";
import { ZodiacSignIcon, PlanetIcon } from "@/components/icons";

interface PlanetSignDegreeItemProps {
  chartPlanet?: ChartPlanet | ChartHouse;
}

export function PlanetSignDegreeItem({
  chartPlanet,
}: PlanetSignDegreeItemProps) {
  if (!chartPlanet) {
    return <></>;
  }

  const { signIndex, degrees, minutes, seconds } = chartPlanet;
  const icon =
    "planetIndex" in chartPlanet ? (
      <PlanetIcon planet={chartPlanet.planetIndex} />
    ) : (
      <Box sx={{ width: "20px" }}>AC</Box>
    );

  const label =
    "planetIndex" in chartPlanet
      ? `${Planet[chartPlanet.planetIndex]}`
      : "Ascendant";

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
