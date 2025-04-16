"use client";
import { Grid, Box } from "@mui/material";
import { ChartProvider } from "@/context/ChartContext";
import ChartController from "./ChartController";

export default function HomeContainer() {
  return (
    <ChartProvider>
      <Grid container justifyContent="center">
        <Grid container size={{ xs: 12, md: 11 }} spacing={2} sx={{ m: 2 }}>
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
