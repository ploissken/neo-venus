import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ChartPlanet } from "@/lib/chart.types";

interface MapViewProps {
  chartPlanets: Array<ChartPlanet>;
}

export default function MapView({ chartPlanets = [] }: MapViewProps) {
  return (
    <Grid size={12}>
      {chartPlanets.map(({ name, sign, hour, min, sec }) => (
        <Box
          key={name}
          sx={{ backgroundColor: "#333" }}
        >{`${name} ${sign} - ${hour}°${min}'${sec}"`}</Box>
      ))}
    </Grid>
  );
}
