"use client";
import { Grid, Box } from "@mui/material";
import { ChartController } from "../home/ChartController";
import { ChartProvider } from "@/context/ChartContext";
import ProfileHeader from "./ProfileHeader";

export default function UserProfileContainer() {
  return (
    <ChartProvider>
      <Grid container justifyContent="center">
        <Grid container size={{ xs: 12, lg: 8 }} spacing={2} sx={{ m: 2 }}>
          <Grid size={12}>
            <ProfileHeader />
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
