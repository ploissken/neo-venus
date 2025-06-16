import { PlanetIcon, ZodiacSignIcon } from "@/components/icons";
import { Chart, Planet } from "@/lib/chart";
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
  Box,
  ListItemButton,
  Typography,
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
        <Box display="flex" alignItems="center">
          <PlanetIcon planet={Planet.Sun} size={16} />
          <ZodiacSignIcon sign={chart.sunSign!} color="silver" size={16} />
        </Box>
        <Box display="flex" alignItems="center">
          <PlanetIcon planet={Planet.Moon} size={16} />
          <ZodiacSignIcon sign={chart.moonSign!} color="silver" size={16} />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          alignContent="center"
          justifyContent="center"
          justifyItems="center"
        >
          <Typography variant="caption" sx={{ mr: 0.5 }}>
            ASC
          </Typography>
          <ZodiacSignIcon sign={chart.ascSign!} color="silver" size={16} />
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
