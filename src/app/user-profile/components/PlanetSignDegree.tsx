import { ChartPlanet, Planet } from "@/lib/chart.types";
import Grid from "@mui/material/Grid";
import ZodiacSignIcon from "@/app/components/ZodiacSignIcon";
import PlanetIcon from "@/app/components/PlanetIcon";

interface PlanetSignDegreeProps {
  chartPlanet: ChartPlanet;
}

export default function PlanetSignDegree({
  chartPlanet,
}: PlanetSignDegreeProps) {
  const { planetIndex, signIndex, hour, min, sec } = chartPlanet;
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid container alignItems="center">
        <PlanetIcon planet={planetIndex} />
      </Grid>
      <Grid>{`${Planet[planetIndex]}`}</Grid>
      <Grid container alignItems="center" sx={{ mx: 1 }}>
        <ZodiacSignIcon sign={signIndex} />
      </Grid>
      <Grid container size="grow" justifyContent="flex-end">
        {`${hour}°${min}'${sec}"`}
      </Grid>
    </Grid>
  );
}
