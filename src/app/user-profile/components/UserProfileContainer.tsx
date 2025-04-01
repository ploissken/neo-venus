import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MapView from "./MapView";

export default function UserProfileContainer() {
  return (
    <Grid container justifyContent="center">
      <Grid container size={{ xs: 12, md: 8 }} spacing={2} sx={{ m: 2 }}>
        <Grid size={12}>
          <Box sx={{ backgroundColor: "#222" }}>profile head section</Box>
        </Grid>
        <Grid size={8}>
          <Box sx={{ backgroundColor: "#222" }}>
            <MapView />
          </Box>
        </Grid>
        <Grid size={4}>
          <Box sx={{ backgroundColor: "#222" }}>map data</Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
