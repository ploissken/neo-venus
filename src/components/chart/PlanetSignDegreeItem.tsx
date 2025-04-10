import { ChartHouse, ChartPlanet, Planet } from "@/lib/chart.types";
import Grid from "@mui/material/Grid";
import ZodiacSignIcon from "@/components/chart/ZodiacSignIcon";
import PlanetIcon from "@/components/chart/PlanetIcon";
import Box from "@mui/material/Box";

interface PlanetSignDegreeItemProps {
  chartPlanet: ChartPlanet | ChartHouse;
}

export default function PlanetSignDegreeItem({
  chartPlanet,
}: PlanetSignDegreeItemProps) {
  const { signIndex, hour, min, sec } = chartPlanet;
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
        {`${hour}°${min}'${sec}"`}
      </Grid>
    </Grid>
  );
}
