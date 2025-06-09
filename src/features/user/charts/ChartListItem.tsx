import { PlanetIcon, ZodiacSignIcon } from "@/components/icons";
import { Chart, Planet } from "@/lib/chart";
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
  Box,
  ListItemButton,
} from "@mui/material";

export default function ChartListItem({
  chart,
  onClick,
  selectedId,
}: {
  chart: Chart;
  onClick: () => void;
  selectedId?: string;
}) {
  const planets = (
    <>
      <Grid container sx={{ gap: 2 }}>
        {chart.name}
        <Box>
          <PlanetIcon planet={Planet.Sun} />
          <ZodiacSignIcon sign={chart.sunSign!} color="silver" />
        </Box>
        <Box>
          <PlanetIcon planet={Planet.Moon} />
          <ZodiacSignIcon sign={chart.moonSign!} color="silver" />
        </Box>
        <Box>
          ASC
          <ZodiacSignIcon sign={chart.ascSign!} color="silver" />
        </Box>
      </Grid>
    </>
  );

  const naiveDate = chart.metadata.inputDate.naiveDate;
  const chartDate = `${naiveDate.day}/${naiveDate.month}/${naiveDate.year}`;
  const metadata = `${chartDate} - ${chart.metadata.location.displayName}`;

  return (
    <ListItemButton onClick={onClick} selected={selectedId === chart.id}>
      <ListItemAvatar>
        <Avatar>
          <ZodiacSignIcon sign={chart.sunSign!} color="silver" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={planets} secondary={metadata} />
    </ListItemButton>
  );
}
