"use client";
import { Grid, Box } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import { mockChart } from "@/__mocks__";
import { ChartController } from "@/features/create-chart/ChartController";

export default function UserProfileContainer() {
  return (
    <Grid container justifyContent="center">
      <Grid container size={{ xs: 12, lg: 8 }} spacing={2} sx={{ m: 2 }}>
        <Grid size={12}>
          <ProfileHeader />
        </Grid>
        <Grid size={12}>
          <Box sx={{ backgroundColor: "#222" }}>
            <ChartController chart={mockChart} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
