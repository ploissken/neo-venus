"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ChartController from "./ChartController";
import { ChartProvider } from "@/context/ChartContext";

export default function UserProfileContainer() {
  return (
    <ChartProvider>
      <Grid container justifyContent="center">
        <Grid container size={{ xs: 12, lg: 8 }} spacing={2} sx={{ m: 2 }}>
          <Grid size={12}>
            <Box sx={{ backgroundColor: "#222" }}>profile head section</Box>
          </Grid>
          <Grid size={12}>
            <Box sx={{ backgroundColor: "#222" }}>
              <ChartController />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ChartProvider>
  );
}
